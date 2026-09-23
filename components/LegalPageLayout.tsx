import Footer from "@/components/Footer";

export interface LegalSection {
  heading: string;
  body: string[];
  list?: string[];
}

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  intro?: string[];
  sections: LegalSection[];
}

export default function LegalPageLayout({ title, effectiveDate, intro, sections }: LegalPageLayoutProps) {
  return (
    <div className="bg-[#fcf8f3]">
      <section className="px-5 sm:px-10 lg:px-[75px] pt-[110px] lg:pt-[160px] pb-8 lg:pb-[50px]">
        <div className="max-w-[820px] mx-auto flex flex-col gap-3 lg:gap-[15px]">
          <h1 className="font-aleo font-bold text-[36px] lg:text-[52px] leading-[1.1] text-[#380102]">{title}</h1>
          <p className="font-aleo text-[14px] text-[#380102] opacity-60">Effective {effectiveDate}</p>
        </div>
      </section>

      <section className="px-5 sm:px-10 lg:px-[75px] pb-16 lg:pb-[100px]">
        <div className="max-w-[820px] mx-auto flex flex-col gap-10 lg:gap-[45px]">
          {intro && (
            <div className="flex flex-col gap-[18px]">
              {intro.map((p, i) => (
                <p key={i} className="font-aleo text-[17px] lg:text-[18px] leading-[1.7] text-[#380102]">
                  {p}
                </p>
              ))}
            </div>
          )}

          {sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-[14px]">
              <h2 className="font-aleo font-bold text-[21px] lg:text-[24px] leading-[1.25] text-[#380102]">
                {i + 1}. {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className="font-aleo text-[16px] lg:text-[17px] leading-[1.7] text-[#380102] opacity-85">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-[8px] pl-[22px]">
                  {s.list.map((item, k) => (
                    <li key={k} className="font-aleo text-[16px] lg:text-[17px] leading-[1.6] text-[#380102] opacity-85 list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
