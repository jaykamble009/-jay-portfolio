import { z } from "zod";

export const SUBJECT_OPTIONS = [
  { value: "job_opportunity",       label: "💼 Job Opportunity" },
  { value: "freelance_project",     label: "🤝 Freelance Project" },
  { value: "project_collaboration", label: "🚀 Project Collaboration" },
  { value: "interview_invitation",  label: "🎤 Interview Invitation" },
  { value: "general_inquiry",       label: "💬 General Inquiry" },
  { value: "other",                 label: "📢 Other" },
] as const;

export type SubjectValue = (typeof SUBJECT_OPTIONS)[number]["value"];

export const contactSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long").trim(),
    email: z.string().min(1, "Email is required").email("Invalid email address").trim(),
    subject: z
      .string()
      .min(1, "Please select a subject")
      .refine(
        (val) => SUBJECT_OPTIONS.some((o) => o.value === val),
        { message: "Please select a valid subject" }
      ),
    customSubject: z.string().max(150, "Custom subject is too long").trim().optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(2000, "Message is too long")
      .trim(),
    honeypot: z.string().max(0, "Invalid submission").optional(),
  })
  .refine(
    (data) => data.subject !== "other" || (data.customSubject && data.customSubject.length > 0),
    { message: "Please specify your custom subject", path: ["customSubject"] }
  );

export type ContactFormData = z.infer<typeof contactSchema>;

/** Returns the human-readable subject string to include in the email. */
export function resolveSubjectLabel(data: ContactFormData): string {
  if (data.subject === "other" && data.customSubject) return data.customSubject;
  return SUBJECT_OPTIONS.find((o) => o.value === data.subject)?.label.replace(/^\S+\s/, "") ?? data.subject;
}
