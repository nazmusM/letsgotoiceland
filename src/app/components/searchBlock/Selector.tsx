import { Fragment } from "react";
import { formatUID, classNames } from "@/utils";
import { Listbox, Transition } from "@headlessui/react";

export default function Selector({
  field,
  selected,
  choices,
  onChange,
}: {
  field: string;
  selected: string;
  choices: string[];
  onChange: (selector: string, value: string) => void;
}) {
  return (
    <Listbox value={selected} onChange={(e) => onChange(field, e as string)}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-[170px] cursor-default rounded-full bg-white px-4 py-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-black sm:text-sm sm:leading-6">
              <span className="block truncate text-base font-semibold">{formatUID(selected)}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {/* <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black">
                {choices.map((name, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-lightGray" : "text-darkGray",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {formatUID(name)}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-darkGray",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
