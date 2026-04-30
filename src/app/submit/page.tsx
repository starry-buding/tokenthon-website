"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { QRCodeSVG } from "qrcode.react";

export default function SubmitPage() {
  const [submitPageUrl, setSubmitPageUrl] = useState("/submit");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    projectDescription: "",
    githubUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setSubmitPageUrl(`${window.location.origin}/submit`);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          projectDescription: formData.projectDescription,
          ...(formData.githubUrl && { githubUrl: formData.githubUrl }),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      setMessage({
        type: "success",
        text: "Registration successful! We will contact you soon.",
      });
      setFormData({
        name: "",
        contact: "",
        projectDescription: "",
        githubUrl: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Registration failed, please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-white">
      <SiteNav />
      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row max-w-7xl mx-auto">
        <section
          lang="en"
          className="flex flex-1 flex-col justify-center px-8 py-12 lg:max-w-[58%] lg:px-14 lg:py-16 xl:px-20"
        >
          <h1 className="text-4xl font-bold text-brand md:text-5xl">Submit</h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-brand/90">
            Complete the Form: Fill out the form below and indicate which
            Tokenthon city stop or online session you are interested in
            attending. Our team will review your submission, confirm your spot,
            and send you the full agenda and participation guide.
          </p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed ">
            Submit Your Materials: Please send all materials to{" "}
            <span className="text-brand/90">tokenthon@alloyx.com </span> within
            one week of form submission.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3">
            <QRCodeSVG value={submitPageUrl} size={88} />
            <div className="text-sm text-brand/90">
              <p className="font-medium text-brand">Scan to open Submit page</p>
              <p className="mt-1">Use your phone camera to jump here directly.</p>
            </div>
          </div>

          <form
            className="mt-10 flex max-w-xl flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <p>To complete your submission:</p>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>Name (required)</span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition focus:border-brand focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>Contact (required)</span>
              <input
                type="text"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                placeholder="Phone / Email / Telegram, etc."
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition placeholder:text-slate-400 focus:border-brand focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>Project Description (required)</span>
              <textarea
                name="projectDescription"
                required
                value={formData.projectDescription}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your project..."
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition placeholder:text-slate-400 focus:border-brand focus:ring-2 resize-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>GitHub URL (optional)</span>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/your-project"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition placeholder:text-slate-400 focus:border-brand focus:ring-2"
              />
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                name="agree"
                required
                className="mt-1 accent-brand"
              />
              <span>
                By continuing, you agree to our{" "}
                <Link
                  href="#"
                  className="text-brand underline underline-offset-2"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-brand underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>

        <div className="relative min-h-[280px] flex-1 lg:min-h-0 lg:max-w-[42%]">
          <Image
            src="/images/register-side.png"
            alt="Sci-fi data center and database visualization"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
