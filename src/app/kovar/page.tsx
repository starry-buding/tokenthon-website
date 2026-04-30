"use client";

import Image from "next/image";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { useCreateReceiving } from "@/api/kovar";

export default function KovarPage() {
  const [formData, setFormData] = useState({
    kovarAccount: "",
    address: "",
    amount: "",
    githubUrl: "",
  });
  const receivingMutation = useCreateReceiving();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    receivingMutation.mutate(formData, {
      onSuccess: () => {
        setMessage({
          type: "success",
          text: "Registration successful! We will contact you soon.",
        });
        setFormData({
          kovarAccount: "",
          address: "",
          amount: "",
          githubUrl: "",
        });
      },
      onError: (error) => {
        setMessage({
          type: "error",
          text:
            error instanceof Error
              ? error.message
              : "Registration failed, please try again.",
        });
      },
    });
  };

  return (
    <div className="min-h-full bg-white">
      <SiteNav />
      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row max-w-7xl mx-auto">
        <aside className="hidden lg:flex lg:w-[42%] lg:items-center lg:justify-center lg:px-6 xl:px-10">
          <div className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-brand/10 bg-gradient-to-br from-slate-900 via-brand to-slate-800 shadow-xl">
            <Image
              src="/images/register-side1.png"
              alt="Futuristic technology visual"
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/15 to-transparent" />
          </div>
        </aside>
        <section
          lang="en"
          className="flex flex-1 flex-col justify-center px-8 py-12 lg:max-w-[58%] lg:px-14 lg:py-16 xl:px-20"
        >
          <h1 className="text-4xl font-bold text-brand md:text-5xl">Kovar</h1>

          <form
            className="mt-10 flex max-w-xl flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>MPC wallet account (Kovar)</span>
              <span className="text-xs font-normal text-slate-500">
                Your Kovar MPC wallet identifier or account reference.
              </span>
              <input
                type="text"
                name="kovarAccount"
                required
                value={formData.kovarAccount}
                onChange={handleChange}
                autoComplete="off"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition focus:border-brand focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>MPC wallet receiving address</span>
              <span className="text-xs font-normal text-slate-500">
                On-chain address where tokens should be received for this MPC
                wallet.
              </span>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                autoComplete="off"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition focus:border-brand focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>Receiving amount</span>
              <input
                type="text"
                name="amount"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="Receiving amount"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition placeholder:text-slate-400 focus:border-brand focus:ring-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-brand/90">
              <span>Tokenthon Capital Hub</span>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/your-project"
                className="rounded-md border border-brand/45 bg-white px-3 py-2.5 text-slate-800 outline-none ring-brand/20 transition placeholder:text-slate-400 focus:border-brand focus:ring-2"
              />
            </label>

            <button
              type="submit"
              disabled={receivingMutation.isPending}
              className="w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {receivingMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
