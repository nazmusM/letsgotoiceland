"use client";
import { Popover } from "@headlessui/react";
import { Content } from "@prismicio/client";
import Image from "next/image";

export default function Overview({
  overviewIcons = [],
}: {
  overviewIcons: Content.ExperienceDocumentDataIconsItem[];
}) {
  if (!overviewIcons.length) {
    return null;
  }
  return (
    <div className="grid grid-cols-4 flex-row items-center justify-center text-center md:divide-x md:divide-borderGray border-b border-borderGray md:pb-10 pb-6">
      {overviewIcons.map((icon, index) => {
        return (
          <div
            key={index}
            className={`col-span-2 flex flex-1 flex-wrap items-center space-x-2 md:col-span-1 ${index > 0 && "md:pl-4"} md:pb-0 pb-2`}
          >
            <div dangerouslySetInnerHTML={{ __html: icon.svg as string }}></div>
            <span className="md:text-base text-sm">{icon.label}</span>
            {icon.tooltip && (
              <Popover className="relative">
                <Popover.Button className="focus:outline-none">
                  <Image
                    src="/icons/Info - fill.svg"
                    height={16}
                    width={16}
                    className="items-center"
                    alt="info icon"
                  />
                </Popover.Button>
                <Popover.Panel className="absolute z-20 bg-tooltip text-white mt-1 w-80 rounded-lg md:rounded-xl bg-white p-4 text-sm text-left md:left-1/2 right-0 transform md:-translate-x-1/2">
                  <div className="relative">
                    <div className="absolute top-[-20px] md:top-[-24px] -right-3  md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-tooltip rotate-45"></div>
                    {icon.tooltip}
                  </div>
                </Popover.Panel>
              </Popover>
            )}
          </div>
        );
      })}
    </div>
  );
}
