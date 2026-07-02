import { Hero } from "@/components/sections/hero";
import { getProfile } from "@/application/services/getProfile";
import { Footer } from "@/components/layout";

export default function Home() {
  const profile = getProfile();

  return (
    <main>
      {/* Hide navbar and footer on the landing page to match the full-viewport design */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        header, footer { display: none !important; }
        body { padding-top: 0 !important; }
      `,
        }}
      />
      <Hero profile={profile} />
    </main>
  );
}
