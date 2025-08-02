import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Content, isFilled } from "@prismicio/client";
import { generateURL } from "@/utils";

export default function Dropdown({
  activities,
}: {
  activities: Content.NavbarDocumentDataActivitiesItem[];
}) {
  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <Menu as="div" className="relative ml-3">
        {({ open }) => {
          return (
            <>
              <div>
                <Menu.Button className="text-base inline-flex items-center px-1 font-semibold text-gray-900">
                  <span className="sr-only">Open Activities menu</span>
                  <span className="mr-1">Activities</span>
                  <Image
                    src={`/icons/${(open && "ChevUp") || "ChevDown"}.svg`}
                    height={2}
                    width={20}
                    alt="grid icon"
                  />
                </Menu.Button>
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
                <Menu.Items className="absolute -left-4 z-10 mt-2 w-48 origin-top-left rounded-lg bg-white object-cover py-2 shadow-lg ring-black border transition-transform duration-300 transform">
                  {activities.map((activity, index) => {
                    if (isFilled.link(activity.menu_link)) {
                      return (
                        <Menu.Item key={index}>
                          <a
                            href={
                              (isFilled.link(activity.menu_link) &&
                                generateURL(activity.menu_link)) ||
                              ""
                            }
                            className="text-base block px-6 py-3 font-semibold text-darkGray hover:bg-lightGray hover:text-black"
                          >
                            {activity.menu_label}
                          </a>
                        </Menu.Item>
                      );
                    }
                  })}
                </Menu.Items>
              </Transition>
            </>
          );
        }}
      </Menu>
    </div>
  );
}
