function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StocksTab(props) {
  const tabs = [
    { name: "Overview", href: "#", current: props.id === "1", id: "1" },
    { name: "Stocks List", href: "#", current: props.id === "2", id: "2" },
    { name: "Crypto List", href: "#", current: props.id === "3", id: "3" },
    { name: "Economic Calendar", href: "#", current: props.id === "4", id: "4" },
    { name: "Cross Rates", href: "#", current: props.id === "5", id: "5" },
  ];

  return (
    <div className="py-6 px-20">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current).name}
          // onChange={() => props.setFunc((prev) => (prev == "1" ? "2" : "1"))}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-100 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
              onClick={() => props.setFunc(tab.id)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
