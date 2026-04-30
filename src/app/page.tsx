"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { useActivityHomeData } from "@/api/activities";
import { normalizeCoverImageSrc } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: homeData } = useActivityHomeData();
  const items = useMemo(() => homeData?.items ?? [], [homeData?.items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isCarouselHovered) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [items.length, isCarouselHovered]);

  const safeActiveIndex = useMemo(() => {
    if (items.length === 0) return 0;
    return activeIndex % items.length;
  }, [activeIndex, items.length]);

  const goPrev = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goNext = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="flex min-h-full flex-col bg-brand">
      <SiteNav variant="landing" bgColor="bg-brand" />

      <main className="flex flex-1 flex-col">
        <div className="px-6 pb-14 pt-2 md:px-10 lg:px-16">
          <div
            className="mx-auto w-full max-w-6xl"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {items.length > 0 ? (
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex w-full transition-[transform] duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translate3d(-${safeActiveIndex * 100}%, 0, 0)`,
                    }}
                  >
                    {items.map((item) => {
                      const { src, unoptimized } = normalizeCoverImageSrc(
                        item.coverImage,
                      );
                      return (
                        <div
                          key={item.id}
                          className="min-w-full shrink-0 basis-full cursor-pointer"
                          onClick={() => router.push(`/details?id=${item.id}`)}
                        >
                          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
                            <div className="order-2 flex justify-center lg:order-1">
                              <div className="w-full max-w-xl overflow-hidden rounded-3xl">
                                <Image
                                  src={src}
                                  alt={item.title}
                                  width={556}
                                  height={313}
                                  className="h-auto w-full object-cover object-center"
                                  unoptimized={unoptimized}
                                />
                              </div>
                            </div>
                            <div className="order-1 flex flex-col justify-center gap-6 text-white lg:order-2 lg:pl-4">
                              <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl xl:text-[2.35rem]">
                                {item.title}
                              </h1>
                              <div className="text-base leading-relaxed text-white/95 md:text-lg">
                                {item.city?.cityName && (
                                  <p className="flex">
                                    <Image
                                      src="/images/address.svg"
                                      alt="Sci-fi data center and database visualization"
                                      width={24}
                                      height={24}
                                    />
                                    <span className="text-white/80 ml-1">
                                      Address: {item.city?.cityName}
                                    </span>
                                  </p>
                                )}

                                {item.publishTime && (
                                  <p className="flex mt-2">
                                    <Image
                                      src="/images/dateSvg.svg"
                                      alt="Sci-fi data center and database visualization"
                                      width={24}
                                      height={24}
                                    />
                                    <span className="text-white/80 ml-1">
                                      Time: {item.publishTime}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {items.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65 cursor-pointer lg:-left-12"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65 cursor-pointer lg:-right-12"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute -bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                        {items.map((item, idx) => (
                          <button
                            key={item.id}
                            type="button"
                            aria-label={`Go to slide ${idx + 1}`}
                            onClick={() => setActiveIndex(idx)}
                            className={
                              idx === safeActiveIndex
                                ? "h-2.5 w-2.5 rounded-full bg-white cursor-pointer"
                                : "h-2.5 w-2.5 rounded-full bg-white/45 cursor-pointer"
                            }
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
                <div className="order-2 flex justify-center lg:order-1">
                  <div className="h-[313px] w-full max-w-xl rounded-3xl bg-white/10" />
                </div>
                <div className="order-1 flex flex-col justify-center gap-6 text-white lg:order-2 lg:pl-4">
                  <p className="text-sm font-medium uppercase tracking-wider text-white/70"></p>
                  <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl xl:text-[2.35rem]"></h1>
                  <p className="text-base leading-relaxed text-white/95 md:text-lg"></p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 rounded-t-[2rem] bg-slate-50 px-6 py-14 text-slate-800 md:px-10 md:py-20 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-16 md:space-y-20">
            <section id="scheme" className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-brand md:text-3xl">
                Core Positioning
              </h3>
              <p className="mt-6 leading-relaxed text-slate-700">
                Tokenthon is a globally leading AI innovation ecosystem
                organization. With &quot;Token&quot; as the core nexus, we are
                dedicated to building the most influential global industrial
                collaboration hub of the AI era. At a time when Token is hailed
                as &quot;digital oil,&quot; Tokenthon is reshaping the value
                chain of computing power, data, and applications to break down
                technological and cost barriers, thereby initiating an
                inclusive, open, and sustainable global token economy ecosystem.
              </p>

              <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                Industry Mission: Breaking the &quot;Token Shackles&quot;
              </h3>
              <p className="mt-6 leading-relaxed text-slate-700">
                <strong className="text-slate-900">Background:</strong>
              </p>

              <p className="mt-4 leading-relaxed text-slate-700">
                Liu Liehong, Director of the National Data Administration,
                explicitly stated at the China Development Forum on March 23,
                2026, that Tokens are &quot;not only the value anchor of the
                intelligent era but also the 'settlement unit' connecting
                technological supply and commercial demand.&quot; China's daily
                Token invocation volume has surged from 100 billion in early
                2024 to 140 trillion in March 2026, representing a growth of
                over a thousandfold in just two years. This growth trajectory
                itself constitutes an economic phenomenon worthy of in-depth
                analysis: from 100 billion in early 2024 to 100 trillion by the
                end of 2025, and further to 140 trillion in March 2026, an
                increase of over 40% in just three months. The exponential
                growth in Token invocation volume signifies that China's AI
                industry is accelerating its transition from the technological
                exploration phase to the stage of large-scale commercial
                application.
              </p>

              <p className="mt-6">
                <strong className="text-slate-900 ">Mission:</strong>
              </p>
              <p className="mt-4 leading-relaxed text-slate-700">
                Amid the wave of AI large model proliferation, developers are
                facing high token costs, complex scheduling logic, and the
                stringent demands of AI Agents for high-frequency invocation.
              </p>

              <p className="mt-4 leading-relaxed text-slate-700">
                From Code Implementation to Economic Reconstruction: Traditional
                hackathons focus on code, while Tokenthon emphasizes the
                &quot;ultimate application of tokenomics.&quot;
              </p>

              <p className="mt-4 leading-relaxed text-slate-700">
                Achieving &quot;Computational Freedom&quot;: By establishing a
                resource aggregation and unified scheduling mechanism, we
                provide developers with an extremely low-barrier token
                experimentation environment, making computational power as
                readily available as tap water and unleashing imagination
                constrained by costs.
              </p>

              <p className="mt-4 leading-relaxed text-slate-700">
                In the current era of AI large model proliferation, tokens have
                become the most essential consumable in the digital world, akin
                to electricity in the industrial age. However, developers and
                enterprises face three major challenges:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-slate-700">
                <li>
                  <strong className="text-slate-900 ">
                    High Token Costs:{" "}
                  </strong>
                  The token consumption of top-tier models makes it difficult
                  for startup teams to afford.
                </li>

                <li>
                  <strong className="text-slate-900 ">
                    Complex Scheduling Logic:{" "}
                  </strong>
                  The technical friction generated by switching between
                  different providers and models is immense.
                </li>

                <li>
                  <strong className="text-slate-900 ">
                    Agent Proliferation:{" "}
                  </strong>
                  The future Web 4.0 is driven by hundreds of millions of AI
                  Agents, which impose near-demanding requirements for
                  high-frequency, low-latency token scheduling.
                </li>
              </ul>

              <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                Tokenthon Vision: Ushering in the Intelligent Era of Web 4.0
              </h3>
              <p className="mt-6 leading-relaxed text-slate-700">
                Tokenthon's ultimate goal is to define the collaboration
                standards for the Web 4.0 era. We are seeking teams capable of
                reshaping the value of tokens—whether it be intelligent
                interactions at ultra-large-scale concurrency, self-evolving
                digital lifeforms, or innovative financial models based on token
                circulation.
              </p>

              <p className="mt-3 text-slate-700">
                When tokens are no longer a burden of innovation but the flowing
                lifeblood, a truly inclusive era of intelligence will be ushered
                in by Tokenthon.
              </p>

              <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                Tokenthon Global Tour: Connecting Global Wisdom, Unleashing
                Token Potential
              </h3>

              <p className="mt-6 leading-relaxed text-slate-700">
                The Tokenthon Global Roadshow is officially underway!
              </p>

              <p className="mt-3">
                From the technological frontiers of Asia to the global
                innovation hubs, the Tokenthon Global Tour is now in full swing.
                We will traverse mountains and seas, starting from the core of
                the Guangdong-Hong Kong-Macao Greater Bay Area in Hong Kong,
                Shenzhen, and Huizhou, delving into inland innovation hubs such
                as Chengdu and Hangzhou, and accelerating our advance into
                global innovation centers like Silicon Valley, Singapore, Tokyo,
                and London.
              </p>

              <p className="mt-3 leading-relaxed text-slate-700">
                Through this series of global roadshows, Tokenthon will deeply
                connect developers, investors, and ecosystem partners from
                around the world. We are not only seeking the most promising AI
                projects but also building a borderless token economy community.
                Next stop, join Tokenthon in defining the future of AI in your
                city!
              </p>

              <div className="border-t border-gray-200 mt-10"></div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Themes and Formats of Tokenthon Series Events
                </h3>

                <p className="mt-6 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">
                    Global Developer Competition
                  </strong>
                </p>

                <p className="mt-6 leading-relaxed text-slate-700">
                  Invite global geeks to develop disruptive AI-native
                  applications and autonomous agents with the support of
                  ultimate token resources.
                </p>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>
                  Technological innovation and geek celebration.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Goal: </strong>
                  In an &quot;unlimited token&quot; environment, produce
                  disruptive AI-native applications through 48-hour extreme
                  development.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Format: </strong>
                  Online/offline hackathons, technical workshops.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  Build Without Boundaries.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Token Innovation Lab (Token Lab)
                </h3>
                <p className="mt-6">
                  Deeply connect government, industry, academia, research, and
                  capital to tackle cutting-edge technological challenges,
                  exploring new payment models and assetization pathways for
                  token circulation.
                </p>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>
                  Hub for Cutting-Edge Technology Breakthroughs and Industrial
                  Application Incubation.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Objective: </strong>
                  To deeply integrate the strengths of government, industry,
                  academia, research, and capital, overcome the technical
                  barriers in the integration of AI and blockchain, and explore
                  new payment models and assetization pathways for
                  &quot;Token&quot; circulation.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Formats: </strong>
                  Closed-door technical seminars, joint R&D projects, industry
                  standard formulation, and annual white paper releases.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  Decoding the Value of the AI Era.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Tokenthon Demo Day
                </h3>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>A
                  platform for project roadshows and capital connection.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Objective: </strong>
                  To showcase outstanding Agent projects incubated by the
                  &quot;Token Innovation Lab&quot; and connect venture capital
                  (VC) institutions with high-quality investment targets.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Format: </strong>
                  Stage roadshows, online live streaming, and one-on-one
                  investment and financing matchmaking.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  From Code to Capital: Showcasing the Future of AI.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Tokenthon X-Enterprise (Enterprise-Level Dialogue)
                </h3>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>A
                  In-depth discussion on AI implementation and industry
                  solutions.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Objective: </strong>
                  To address the pain points enterprises face in large model
                  applications, such as &quot;high token costs and difficulties
                  in private deployment.&quot;
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Format: </strong>
                  Closed-door roundtables, industry salons, etc.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  Scaling Intelligence for Real Business.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Tokenthon City Tour (Global City Tour)
                </h3>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>Brand
                  evangelism and local ecosystem connection.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Objective: </strong>
                  Establish global brand influence, build local developer nodes,
                  and promote the concept of &quot;computing power
                  freedom.&quot;
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Format: </strong>
                  City roadshows, pop-up sharing sessions.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  Uniting the Global Token Economy, One City at a Time.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Tokenthon Campus Spark (University Developer Special Session)
                </h3>

                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Positioning: </strong>
                  Awakening Academic Potential and Incubating Future Talent.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Objective: </strong>
                  Uncover the potential of campus geeks, establish Campus Nodes,
                  and facilitate the practical transformation of academic
                  research into commercial applications (AI Agents).
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Format: </strong>
                  Campus Hack Day, Expert Public Lectures, Mentorship Workshops.
                </p>
                <p className="mt-3 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Core Message: </strong>
                  Igniting the Next Generation of AI Pioneers.
                </p>
              </div>

              <div className="border-t border-gray-200 mt-10"></div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  Tokenthon Global Ambassador Program Officially Launched!
                </h3>

                <p className="mt-6 leading-relaxed text-slate-700">
                  The transformation of the AI era requires a spark in every
                  city.
                </p>
                <p className="mt-6 leading-relaxed text-slate-700">
                  Tokenthon is now recruiting &quot;Global Ambassadors&quot;
                  worldwide who are passionate about AI and the token economy.
                  If you are based in Hong Kong, Shenzhen, Silicon Valley,
                  Singapore, London, Tokyo, or any global innovation hub; if you
                  aspire to connect top developers with capital resources; if
                  you want to become a pioneer in your local AI ecosystem—we are
                  looking for you!
                </p>
                <p className="mt-6 leading-relaxed text-slate-700">
                  As a Tokenthon Ambassador, you will receive:
                </p>
                <p className="mt-6 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">
                    Comprehensive Resource Support:{" "}
                  </strong>
                  Access to Tokenthon's official event funding, venue
                  coordination, and expert mentor support.
                </p>

                <p className="mt-6 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">
                    Ecosystem Priority:{" "}
                  </strong>
                  Priority access to global high-quality AI projects and
                  investment institutions, with deep involvement in the Token
                  Innovation Lab.
                </p>

                <p className="mt-6 leading-relaxed text-slate-700">
                  <strong className="text-slate-900">Global Influence: </strong>
                  Represent Tokenthon in organizing local salons, hackathons,
                  and technical seminars to build personal industry reputation.
                </p>
              </div>

              <div className="border-t border-gray-200 mt-10"></div>

              <div>
                <h3 className="text-2xl font-bold text-brand md:text-3xl mt-10">
                  About Tokenthon
                </h3>

                <p className="mt-6 leading-relaxed text-slate-700">
                  Tokenthon is a globally leading AI innovation ecosystem
                  organization, with a core focus on the deep integration of
                  artificial intelligence and tokens. We are committed to
                  building the most influential global industry collaboration
                  hub in the AI era. Through initiatives such as launching
                  global developer competitions and establishing the &quot;Token
                  Innovation Lab,&quot; Tokenthon deeply connects resources from
                  government, industry, academia, and research, continuously
                  breaking down technical barriers and significantly lowering
                  the innovation threshold for AI applications. In an era where
                  tokens are hailed as &quot;digital oil,&quot; Tokenthon is
                  redefining the value chain of computing power, data, and
                  applications, establishing a new paradigm of collaboration for
                  the AI age, and leading the construction of an open,
                  inclusive, and sustainable global token economy ecosystem.
                </p>
              </div>
            </section>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/submit"
                className="inline-flex rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-hover"
              >
                Submit
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
