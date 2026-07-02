import { PageShell } from "@/components/layout";
import { ContactInfo, ContactForm } from "@/components/sections/contact-form";
import { getProfile } from "@/application/services/getProfile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Chen Sakkol. Open to Junior Developer and Engineering Intern roles.",
};

export default function ContactPage() {
  const profile = getProfile();

  return (
    <PageShell>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ContactInfo channels={profile.contact} socials={profile.socials} />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
