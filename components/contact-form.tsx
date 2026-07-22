'use client'

import { useCallback, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { SubjectSelect } from "@/components/subject-select"
import {
  contactSchema,
  resolveSubjectLabel,
  type ContactFormData,
  type SubjectValue,
} from "@/lib/validations/contact"

// ─── Field styling ────────────────────────────────────────────────────────────
const INPUT_BASE =
  "w-full bg-background/50 border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm"
const INPUT_IDLE = "border-white/10 focus:ring-primary/40 focus:border-primary/40"
const INPUT_ERR  = "border-red-500/40 focus:ring-red-500/25 focus:border-red-500/40"

const fieldClass = (hasError: boolean) =>
  [INPUT_BASE, hasError ? INPUT_ERR : INPUT_IDLE].join(" ")

// ─── Animated inline error ────────────────────────────────────────────────────
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={id}
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 overflow-hidden"
        >
          <AlertCircle className="w-3 h-3 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────
type FormErrors = Partial<Record<keyof ContactFormData, string>>

const EMPTY: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  customSubject: "",
  message: "",
  honeypot: "",
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [fields, setFields]   = useState<ContactFormData>(EMPTY)
  const [errors, setErrors]   = useState<FormErrors>({})
  const [status, setStatus]   = useState<"idle" | "loading" | "success">("idle")

  const isOther   = fields.subject === "other"
  const isLoading = status === "loading"
  const isSuccess = status === "success"

  const clearError = useCallback(
    (key: keyof ContactFormData) =>
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev)),
    []
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFields((prev) => ({ ...prev, [name]: value }))
      clearError(name as keyof ContactFormData)
    },
    [clearError]
  )

  const handleSubjectChange = useCallback(
    (value: SubjectValue) => {
      setFields((prev) => ({
        ...prev,
        subject: value,
        customSubject: value !== "other" ? "" : prev.customSubject,
      }))
      clearError("subject")
      clearError("customSubject")
    },
    [clearError]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Silently ignore bot submissions
    if (fields.honeypot) return

    // Client-side validation
    const parsed = contactSchema.safeParse(fields)
    if (!parsed.success) {
      const fieldErrors: FormErrors = {}
      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData
        if (key && !fieldErrors[key]) fieldErrors[key] = err.message
      })
      setErrors(fieldErrors)
      const firstKey = Object.keys(fieldErrors)[0]
      document.getElementById(firstKey === "subject" ? "subject-trigger" : firstKey)?.focus()
      return
    }

    setStatus("loading")

    try {
      const resolvedSubject = resolveSubjectLabel(fields)

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_41fimvn"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_tv9n2fb"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "SD-IJx3pzZdZ_5lmV"

      let emailJsSent = false;
      try {
        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: fields.name,
              from_email: fields.email,
              name: fields.name,
              email: fields.email,
              subject: resolvedSubject,
              message: fields.message,
              reply_to: fields.email,
              to_name: "Jay Kamble"
            },
            publicKey
          );
          emailJsSent = true;
        }
      } catch (eJSerr) {
        console.warn("[ContactForm] EmailJS client attempt notice:", eJSerr);
      }

      // Also dispatch to API route for logging/backup
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          subject: resolvedSubject,
          message: fields.message,
          honeypot: fields.honeypot
        })
      });

      const data = await response.json();

      if (!response.ok && !emailJsSent) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus("success")
      setFields(EMPTY)
      setErrors({})

      toast.success("Message sent successfully! ✉️", {
        description: "Thank you for reaching out. I'll get back to you shortly.",
        duration: 6000,
      })

      setTimeout(() => setStatus("idle"), 6000)
    } catch (err: any) {
      console.error("[ContactForm] Error:", err)
      const errorMsg = err?.message || "Something went wrong"
      setStatus("idle")
      toast.error("Failed to send message", {
        description: errorMsg,
        duration: 8000,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
        className="bg-background/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4.5"
      >
        {/* Honeypot */}
        <input
          type="text"
          name="honeypot"
          value={fields.honeypot}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Name & Email */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Full Name <span aria-hidden className="text-red-400">*</span>
            </label>
            <input
              id="name" name="name" type="text" autoComplete="name"
              value={fields.name} onChange={handleChange}
              disabled={isLoading || isSuccess}
              placeholder="John Doe"
              aria-required="true" aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={fieldClass(!!errors.name)}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span aria-hidden className="text-red-400">*</span>
            </label>
            <input
              id="email" name="email" type="email" autoComplete="email"
              value={fields.email} onChange={handleChange}
              disabled={isLoading || isSuccess}
              placeholder="john@example.com"
              aria-required="true" aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={fieldClass(!!errors.email)}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
        </div>

        {/* Subject dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="subject-trigger" className="text-sm font-medium text-foreground">
            Subject <span aria-hidden className="text-red-400">*</span>
          </label>
          <SubjectSelect
            id="subject-trigger"
            value={fields.subject}
            onChange={handleSubjectChange}
            disabled={isLoading || isSuccess}
            hasError={!!errors.subject}
          />
          <FieldError id="subject-error" message={errors.subject} />
        </div>

        {/* Custom subject (Other) */}
        <AnimatePresence>
          {isOther && (
            <motion.div
              key="custom-subject"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-1.5 pt-1">
                <label htmlFor="customSubject" className="text-sm font-medium text-foreground">
                  Custom Subject <span aria-hidden className="text-red-400">*</span>
                </label>
                <input
                  id="customSubject" name="customSubject" type="text"
                  value={fields.customSubject ?? ""} onChange={handleChange}
                  disabled={isLoading || isSuccess}
                  placeholder="Please specify your subject..."
                  aria-required="true" aria-invalid={!!errors.customSubject}
                  aria-describedby={errors.customSubject ? "customSubject-error" : undefined}
                  className={fieldClass(!!errors.customSubject)}
                />
                <FieldError id="customSubject-error" message={errors.customSubject} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message <span aria-hidden className="text-red-400">*</span>
          </label>
          <textarea
            id="message" name="message"
            value={fields.message} onChange={handleChange}
            disabled={isLoading || isSuccess}
            rows={4} placeholder="Your message here..."
            aria-required="true" aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={[fieldClass(!!errors.message), "resize-none"].join(" ")}
          />
          <div className="flex items-start justify-between gap-2">
            <FieldError id="message-error" message={errors.message} />
            <span
              aria-live="polite"
              className={[
                "text-xs shrink-0 ml-auto tabular-nums",
                fields.message.length > 1800 ? "text-red-400" : "text-muted-foreground/50",
              ].join(" ")}
            >
              {fields.message.length}/2000
            </span>
          </div>
        </div>

        {/* Success banner */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              role="status"
              className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                <strong className="font-semibold">Thank you!</strong> Your message has been sent
                successfully. I'll get back to you as soon as possible.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 group transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }} className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </motion.span>
            ) : isSuccess ? (
              <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Message Sent
              </motion.span>
            ) : (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }} className="flex items-center gap-2">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </motion.div>
  )
}
