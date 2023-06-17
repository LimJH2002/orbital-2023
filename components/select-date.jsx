import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 1 },
  { name: "March", value: 1 },
  { name: "Apirl", value: 1 },
  { name: "May", value: 1 },
  { name: "June", value: 1 },
  { name: "July", value: 1 },
  { name: "August", value: 1 },
  { name: "September", value: 1 },
  { name: "October", value: 1 },
  { name: "November", value: 1 },
  { name: "December", value: 1 },
];

let current = new Date();
let year = current.getFullYear();
let month = current.getMonth();

const years = [];
while (year >= 2020) {
  years.push(year--);
}

export default function SelectDate(props) {
  const [selectedMonth, setSelectedMonth] = useState(months[month]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <Fragment>
      <Listbox
        value={selectedMonth}
        onChange={setSelectedMonth}
        className="w-40 pr-2 pl-2"
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedMonth.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {months.map((month, monthIdx) => (
                <Listbox.Option
                  key={monthIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-6 pr-2 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                  value={month}
                >
                  {month.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox
        value={selectedYear}
        onChange={setSelectedYear}
        className="pr-4 w-40"
      >
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedYear}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {years.map((year, yearIdx) => (
                <Listbox.Option
                  key={yearIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-6 pr-4 ${
                      active ? "bg-sky-100 text-sky-900" : "text-gray-900"
                    }`
                  }
                  value={year}
                >
                  {year}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </Fragment>
  );
}
