"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Clock } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // TODO: Replace with actual form endpoint (e.g. Formspree, Resend)
    // For now, open mailto as a fallback
    const mailtoUrl = `mailto:hello@sakkol.dev?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`)}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <FadeIn delay={0.2} className="bg-card-bg border border-card-border rounded-lg p-card-padding shadow-2xl relative overflow-hidden">
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {submitted && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-card-bg/90 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-primary-fixed" />
            </div>
            <p className="text-body-lg text-primary font-medium">Message sent!</p>
            <p className="text-meta text-on-surface-variant mt-2">
              Thank you for reaching out.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-meta text-on-surface-variant">
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="John Doe"
              className="bg-surface-container-low border border-card-border rounded-md px-4 py-3 text-body-md text-primary focus:border-primary-fixed focus:outline-none transition-colors"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-meta text-error">{errors.name.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-meta text-on-surface-variant">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="john@example.com"
              className="bg-surface-container-low border border-card-border rounded-md px-4 py-3 text-body-md text-primary focus:border-primary-fixed focus:outline-none transition-colors"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-meta text-error">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-subject" className="text-meta text-on-surface-variant">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Job Opportunity"
            className="bg-surface-container-low border border-card-border rounded-md px-4 py-3 text-body-md text-primary focus:border-primary-fixed focus:outline-none transition-colors"
            {...register("subject")}
          />
          {errors.subject && (
            <span className="text-meta text-error">{errors.subject.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-meta text-on-surface-variant">
            Message
          </label>
          <textarea
            id="contact-message"
            placeholder="Tell me about your project..."
            rows={5}
            className="bg-surface-container-low border border-card-border rounded-md px-4 py-3 text-body-md text-primary focus:border-primary-fixed focus:outline-none transition-colors resize-none"
            {...register("message")}
          />
          {errors.message && (
            <span className="text-meta text-error">{errors.message.message}</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-primary-fixed text-on-primary-fixed text-body-md font-bold px-8 py-3 rounded flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-colors disabled:opacity-50"
          >
            <span>Send Message</span>
            <Send size={20} strokeWidth={1.5} />
          </button>
          <p className="text-meta text-on-surface-variant flex items-center gap-2">
            <Clock size={16} strokeWidth={1.5} />
            I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </form>
    </FadeIn>
  );
}
