import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";

export default function PreviousPage() {
  return (
    <div className="flex min-h-full flex-col bg-brand">
      <SiteNav variant="landing" bgColor="bg-brand" />

      <main className="flex flex-1 flex-col">
        <div className="px-6 pb-14 pt-2 md:px-10 lg:px-16">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
            <div className="order-2 flex justify-center lg:order-1">
              <div className="relative w-full max-w-xl overflow-hidden shadow-2xl shadow-black/20">
                <Image
                  src="/images/banner3.png"
                  alt="Tokenthon Global Event Two"
                  width={900}
                  height={1100}
                  className="h-auto w-full rounded-3xl object-cover object-center"
                  priority
                />
              </div>
            </div>
            <div className="order-1 flex flex-col justify-center gap-6 text-white lg:order-2 lg:pl-4">
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                Tokenthon Global Event - Two
              </p>
              <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl xl:text-[2.35rem]">
                Unlocking the New Era of the Token Economy
              </h1>
              <p className="whitespace-pre-line text-base leading-relaxed text-white/95 md:text-lg">
                {
                  "Organizer: AlloyX Group\nDate & Time: April 1, 2026 | 16:00-18:00 (Registration begins at 15:45)\nVenue: Jardine House, Central, Hong Kong, China"
                }
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-t-[2rem] bg-slate-50 px-6 py-14 text-slate-800 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="pt-6 text-2xl font-bold text-brand md:text-3xl">
              Event Overview
            </h2>
            <p className="leading-relaxed text-slate-700">
              What happens when{" "}
              <strong className="text-slate-900">
                AI tokens become as ubiquitous as internet traffic ?
              </strong>
            </p>
            <p className="leading-relaxed text-slate-700">
              In the <strong className="text-slate-900">Web 4.0 era, </strong>{" "}
              tokens are becoming the{" "}
              <strong className="text-slate-900">
                electricity of the digital world.{" "}
              </strong>{" "}
              Yet high costs and complex orchestration are still restricting
              developers&apos; ability to innovate.
            </p>
            <p className="leading-relaxed text-slate-700">
              <strong className="text-slate-900">KOVAR, </strong> strategically
              incubated by{" "}
              <strong className="text-slate-900">AlloyX Group (AXG), </strong>{" "}
              is launching the{" "}
              <strong className="text-slate-900">
                Tokenthon Global Innovation Competition{" "}
              </strong>{" "}
              - a new track distinct from traditional hackathons. Here, the
              focus is not only on code, but also on the{" "}
              <strong className="text-slate-900">
                extreme applications of token economics.{" "}
              </strong>{" "}
            </p>
            <p className="leading-relaxed text-slate-700">
              This warm-up event will offer participants an early experience of{" "}
              <strong className="text-slate-900">KOVARouter </strong> - the{" "}
              <strong className="text-slate-900">
                world&apos;s first routing gateway designed to break the
                baseline cost of tokens.{" "}
              </strong>{" "}
              It enables developers to build truly disruptive{" "}
              <strong className="text-slate-900">
                AI-native applications{" "}
              </strong>{" "}
              in an environment that is{" "}
              <strong className="text-slate-900">
                near-unlimited and ultra-low-cost for experimentation.
              </strong>{" "}
            </p>
            <p className="leading-relaxed text-slate-700">
              Inspiration &amp; Exploration:
            </p>
            <p className="leading-relaxed text-slate-700">
              Discover cutting-edge Web 4.0 directions such as{" "}
              <strong className="text-slate-900">
                large-scale concurrent AI customer service, autonomous
                multi-agent collaboration, and long-context reasoning systems.
              </strong>{" "}
            </p>

            <h2 className="pt-6 text-2xl font-bold text-brand md:text-3xl">
              Who Should Attend
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Tech Entrepreneurs
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Founders seeking ways to lower barriers to AI innovation and
                optimize model orchestration costs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Venture Capitalists (VCs)
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Investors focused on{" "}
                <strong className="text-slate-900">
                  Web 4.0 (AI + Web3), digital asset infrastructure, and the
                  intelligent economy.
                </strong>{" "}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Enterprise Decision-Makers
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Executives from financial and technology companies exploring
                solutions such as{" "}
                <strong className="text-slate-900">
                  high-concurrency AI customer service and autonomous
                  multi-agent collaboration.
                </strong>{" "}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Strategic Partners
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Institutions interested in building deeper collaborations with
                the{" "}
                <strong className="text-slate-900">
                  AlloyX ecosystem and the KOVAR platform.
                </strong>{" "}
              </p>
            </div>

            <h2 className="pt-6 text-2xl font-bold text-brand md:text-3xl">
              Event Agenda
            </h2>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">15:45 - 16:00</p>
              <p className="mt-1 font-semibold text-slate-900">
                Registration &amp; Networking
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">16:00 - 16:10</p>
              <p className="mt-1 font-semibold text-slate-900">
                Opening Remarks
              </p>
              <p className="mt-1 text-slate-700">
                AlloyX Group&apos;s Vision for Web 4.0
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">16:10 - 16:30</p>
              <p className="mt-1 font-semibold text-slate-900">
                Product Launch
              </p>
              <p className="mt-1 text-slate-700">
                KOVARouter - Breaking the Cost Barrier for AI Innovation
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">16:30 - 16:50</p>
              <p className="mt-1 font-semibold text-slate-900">
                Tokenthon Preview
              </p>
              <p className="mt-1 text-slate-700">
                Introduction to the Global{" "}
                <strong className="text-slate-900">
                  AI &amp; Tokenthon (Token Innovation Marathon)
                </strong>{" "}
                Series
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-brand">16:50 - 18:00</p>
              <p className="mt-1 font-semibold text-slate-900">
                Networking &amp; Open Discussion
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
