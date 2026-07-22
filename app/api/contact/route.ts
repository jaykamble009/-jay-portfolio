import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// ─── Rate limiting (in-memory, resets on cold start) ─────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) return true;

  record.count += 1;
  return false;
}

// ─── Input sanitization ───────────────────────────────────────────────────────
function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// ─── Server-side schema (receives resolved, human-readable subject) ────────────
const apiContactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .regex(/^[\p{L}\s'\-,.]+$/u, "Name contains invalid characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email too long"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(150, "Subject too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long"),
  honeypot: z.string().max(0).optional(),
});

// ─── HTML email template ──────────────────────────────────────────────────────
function buildHtmlEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  dateTime: string;
  ip: string;
}): string {
  const { name, email, subject, message, dateTime, ip } = params;
  const messageHtml = message.replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;color:#e6edf3;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#161b22;border-radius:16px;border:1px solid #30363d;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#238636,#1a7f37);padding:32px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:28px;">📩</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">
                New Contact Form Submission
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">
                Portfolio — Jay Kamble
              </p>
            </td>
          </tr>

          <!-- Subject pill -->
          <tr>
            <td style="padding:24px 40px 0;text-align:center;">
              <span style="display:inline-block;background:#238636;color:#ffffff;font-size:13px;font-weight:600;padding:6px 18px;border-radius:999px;letter-spacing:0.2px;">
                ${sanitize(subject)}
              </span>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Name -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#7d8590;">Full Name</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#e6edf3;">${sanitize(name)}</p>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#7d8590;">Email Address</p>
                    <p style="margin:0;font-size:16px;color:#58a6ff;">
                      <a href="mailto:${sanitize(email)}" style="color:#58a6ff;text-decoration:none;">${sanitize(email)}</a>
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <hr style="border:none;border-top:1px solid #30363d;margin:0;" />
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#7d8590;">Message</p>
                    <div style="background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:18px;font-size:15px;line-height:1.7;color:#c9d1d9;">
                      ${messageHtml}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Meta footer -->
          <tr>
            <td style="padding:0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;border:1px solid #30363d;border-radius:10px;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #21262d;">
                    <p style="margin:0;font-size:12px;color:#7d8590;">📅 <strong style="color:#8b949e;">Date &amp; Time</strong>&nbsp;&nbsp;${sanitize(dateTime)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-size:12px;color:#7d8590;">🌐 <strong style="color:#8b949e;">IP Address</strong>&nbsp;&nbsp;${sanitize(ip)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer branding -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #21262d;text-align:center;">
              <p style="margin:0;font-size:12px;color:#484f58;">
                Sent via <strong style="color:#58a6ff;">jaykamble.dev</strong> Contact Form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Plain-text fallback ──────────────────────────────────────────────────────
function buildPlainEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  dateTime: string;
  ip: string;
}): string {
  const { name, email, subject, message, dateTime, ip } = params;
  return [
    "New Portfolio Contact Form Submission",
    "=".repeat(42),
    "",
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Subject:     ${subject}`,
    "",
    "Message:",
    "-".repeat(42),
    message,
    "-".repeat(42),
    "",
    `Date & Time: ${dateTime}`,
    `IP Address:  ${ip}`,
  ].join("\n");
}

// ─── Route handler ────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // ── Rate limiting ──────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before submitting again." },
        { status: 429 }
      );
    }

    // ── Parse body ─────────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // ── Honeypot check ─────────────────────────────────────────────────────
    if (
      body &&
      typeof body === "object" &&
      "honeypot" in body &&
      (body as Record<string, unknown>).honeypot
    ) {
      return NextResponse.json({ success: true }); // silently succeed for bots
    }

    // ── Validate ───────────────────────────────────────────────────────────
    const result = apiContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, subject, message } = result.data;

    const dateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailParams = { name, email, subject, message, dateTime, ip };

    // ── Send email ─────────────────────────────────────────────────────────
    // NOTE: Resend free plan with onboarding@resend.dev can only send to
    // the email address that owns/registered the Resend account.
    const toEmail = process.env.CONTACT_EMAIL ?? "jk365242@gmail.com";

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_123456789") {
      console.log("[contact/route] RESEND_API_KEY not configured. Simulated submission received:");
      console.log(buildPlainEmail(emailParams));
      return NextResponse.json({ success: true, message: "Submission logged safely." });
    }

    try {
      const { data: sendData, error: resendError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [toEmail],
        replyTo: [email],
        subject: `📩 New Portfolio Contact — ${subject} (from ${name})`,
        html: buildHtmlEmail(emailParams),
        text: buildPlainEmail(emailParams),
      });

      if (resendError) {
        console.warn("[contact/route] Resend API Warning:", resendError);
        console.log("[contact/route] Submission logged server-side:");
        console.log(buildPlainEmail(emailParams));
        return NextResponse.json({ success: true, message: "Submission logged successfully." });
      }

      console.log("[contact/route] Email sent successfully. ID:", sendData?.id);
      return NextResponse.json({ success: true });
    } catch (sendErr) {
      console.warn("[contact/route] Resend send exception:", sendErr);
      console.log("[contact/route] Submission logged server-side fallback:");
      console.log(buildPlainEmail(emailParams));
      return NextResponse.json({ success: true, message: "Submission logged successfully." });
    }
  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json({ success: true, message: "Logged server-side." });
  }
}
