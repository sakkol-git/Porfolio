import type { LanguageProficiency } from "@/domain/entities/Profile";

interface LanguagesCardProps {
  languages: LanguageProficiency[];
}

export function LanguagesCard({ languages }: LanguagesCardProps) {
  return (
    <section className="col-span-1 lg:col-span-4 flex flex-col gap-[24px] pt-12 lg:pt-0">
      <div className="bg-surface-container-low rounded-md p-[32px] border border-surface-bright h-full">
        <h2 className="text-headline-md text-primary mb-8 border-b border-surface-bright pb-4">
          Languages
        </h2>
        <div className="flex flex-col gap-6">
          {languages.map((lang) => (
            <div key={lang.language} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-body-md text-on-surface font-medium">
                  {lang.language}
                </span>
                <span
                  className={`text-meta ${
                    lang.percentage >= 70
                      ? "text-surface-tint"
                      : "text-on-surface-variant"
                  }`}
                >
                  {lang.level}
                </span>
              </div>
              <div className="w-full h-1 bg-surface-dim rounded-md overflow-hidden">
                <div
                  className={`h-full rounded-md ${
                    lang.percentage >= 70
                      ? "bg-primary-fixed"
                      : "bg-surface-tint opacity-50"
                  }`}
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
