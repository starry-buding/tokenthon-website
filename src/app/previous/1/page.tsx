import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";

export default function Page() {
  return (
    <div>
      <SiteNav />
      <div className="mx-auto max-w-[1200px]">
        <div className="text-[56px] text-brand font-bold text-center mt-[120px] mb-[40px]">
          AI Agent In Action
        </div>
        <Image
          src="/images/details.jpg"
          alt=""
          width={1200}
          height={179}
          className="object-contain"
        />
      </div>
    </div>
  );
}
