"use client";
import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Button from "../Button";
import navBar from "@/navbarData.json";
import { generateURL } from "@/utils";
import { PrismicNextImage } from "@prismicio/next";

export default function Navbar() {
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 py-4 sm:px-6 w-full sm:py-6 lg:px-12 lg:py-6">
            <div className="flex h-16 w-full items-center justify-between">
              <div className="flex w-full justify-between">
                <div className="flex items-center justify-self-start">
                  <Link href="/" className="cursor-pointer">
                    <span className="sr-only">Let&apos;s Go To Iceland</span>
                    <PrismicNextImage field={navBar.data.logo} fallbackAlt="" />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <Dropdown activities={navBar.data.activities} />
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-darkGray hover:border-gray-300 hover:text-gray-700" */}
                    {navBar.data.menu_items.map((item, index) => {
                      if (isFilled.link(item.menu_link)) {
                        return (
                          <a
                            key={index}
                            href={generateURL(item.menu_link)}
                            className="border-b-2px-1 inline-flex items-center text-base font-semibold text-gray-900"
                          >
                            {item.menu_label}
                          </a>
                        );
                      }
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-self-end">
                  <Button
                    onClick={() =>
                      router.push(
                        (isFilled.link(navBar.data.cta_link) &&
                          generateURL(navBar.data.cta_link)) ||
                          "",
                      )
                    }
                    className="text-sm font-medium md:text-base"
                  >
                    {navBar.data.cta_label}
                  </Button>
                </div>
              </div>
              <div className="-mr-2 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex h-full items-center justify-center rounded-md p-2">
                  <span className="sr-only">Open main menu</span>
                  <Image
                    src={`/icons/${(open && "Close") || "Menu"}.svg`}
                    height={24}
                    width={24}
                    alt="grid icon"
                  />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Disclosure.Panel className="absolute z-20 w-full bg-white sm:hidden">
              <div className=" w-full space-y-1 p-4 pt-0">=
                <Disclosure>
                  {({ open }) => {
                    return (
                      <div className="border-1 w-full border-b border-borderGray">
                        <Disclosure.Button className="w-full">
                          <div className="flex w-full justify-between py-4 text-lg font-semibold">
                            <span>Activities</span>
                            <Image
                              src={`/icons/${(open && "ChevUp") || "ChevDown"}.svg`}
                              height={20}
                              width={20}
                              alt="grid icon"
                            />
                          </div>
                        </Disclosure.Button>

                        <Transition
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Disclosure.Panel>
                            {navBar.data.activities.map((item, index) => {
                              if (isFilled.link(item.menu_link)) {
                                return (
                                  <Disclosure.Button
                                    as="a"
                                    key={index}
                                    href={generateURL(item.menu_link)}
                                    className={`block pt-0 pb-4 pr-4 text-base font-normal hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700`}
                                  >
                                    {item.menu_label}
                                  </Disclosure.Button>
                                );
                              }
                            })}
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    );
                  }}
                </Disclosure>
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-darkGray hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                {navBar.data.menu_items.map((item, index) => {
                  if (isFilled.link(item.menu_link)) {
                    return (
                      <Disclosure.Button
                        as="a"
                        key={index}
                        href={generateURL(item.menu_link)}
                        className={`block py-4 pr-4 text-lg font-semibold hover:border-lightGray hover:bg-lightGray hover:text-darkGray ${(index < navBar.data.menu_items.length - 1 && "border-b border-borderGray ") || ""}`}
                      >
                        {item.menu_label}
                      </Disclosure.Button>
                    );
                  }
                })}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
