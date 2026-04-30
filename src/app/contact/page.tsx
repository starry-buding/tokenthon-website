import { SiteNav } from "@/components/SiteNav";

const email = "tokenthon@alloyx.com";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16">
        <section className="grid gap-10">
          <header>
            <p className="text-xs font-semibold text-brand/70">Contact</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Email
            </h1>
            <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
              {email}
            </p>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              For business collaborations, project partnerships, or media
              inquiries, feel free to reach out to us via email.
            </p>
          </header>

          {/* <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold text-slate-500">Address</p>
              <p className="mt-2 text-base font-medium text-slate-900 md:text-lg">
                香港中环康乐广场1号
                <br />
                怡和大厦17楼1710室
              </p>
            </div>

            <a
              href={`mailto:${email}`}
              className="block rounded-2xl border border-brand/25 bg-gradient-to-r from-brand/[0.05] via-white to-sky-50 p-6 shadow-sm transition hover:border-brand/50 hover:shadow-md"
            >
              <p className="text-xs font-semibold text-brand/80">Email</p>
              <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                {email}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                For business collaborations, project partnerships, or media
                inquiries, feel free to reach out to us via email.
              </p>
            </a>
          </div> */}
        </section>
      </main>
    </div>
  );
}
