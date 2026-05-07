import type { ReactNode } from "react";

export function ActaPreviewTimelineStep({
  title,
  body,
  tag,
  value,
  icon,
}: {
  title: string;
  body: ReactNode;
  tag: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="relative pl-16">
      <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border border-[rgba(60,74,66,0.1)] bg-[#201f1f] p-px">
        <div className="relative size-[16.67px]">
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none object-contain"
            src={icon}
          />
        </div>
      </div>
      <h3 className="text-[18px] font-bold leading-7 text-[#e5e2e1]">
        {title}
      </h3>
      <div className="pb-3 text-[16px] font-normal leading-6 text-[#bbcabf]">
        {body}
      </div>
      <div className="inline-flex items-center gap-2 rounded-lg border border-[rgba(60,74,66,0.1)] bg-[#1c1b1b] px-[13px] py-[5px]">
        <span className="text-[10px] font-bold uppercase leading-[15px] tracking-[0.5px] text-[#bbcabf]">
          {tag}
        </span>
        <span className="text-[14px] font-medium leading-5 text-[#4edea3]">
          {value}
        </span>
      </div>
    </div>
  );
}
