import { PageShell } from "@/components/layout";
import { AboutHeader } from "@/components/sections/about";
import { Timeline } from "@/components/sections/timeline";
import { LanguagesCard } from "@/components/sections/languages";
import { getProfile } from "@/application/services/getProfile";
import { getTimeline } from "@/application/services/getTimeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Chen Sakkol, a Full-Stack Developer with a background in IT Engineering and comprehensive work experience.",
};

export default function AboutPage() {
  const profile = getProfile();
  const timeline = getTimeline();

  return (
    <PageShell>
      <AboutHeader profile={profile} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8">
        <Timeline entries={timeline} />
        <LanguagesCard languages={profile.languages} />
      </div>
    </PageShell>
  );
}
