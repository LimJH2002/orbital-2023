import { Fragment, useState } from "react";
import {
  ScaleIcon,
  BanknotesIcon,
  FireIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import useSWR from "swr";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Loading from "@/pages/loading";
import MonthName from "@/functions/MonthName";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const currMonth = MonthName();

const desc = [
  "Money left for " + currMonth,
  "Total amount received for " + currMonth,
  "Total amount spent for " + currMonth,
  "To be in budget after" + currMonth + " ends",
];

const cards = [
  {
    name: "Budget Left",
    icon: ScaleIcon,
    amount: "SGD 0",
    lastMonth: "20",
  },
  {
    name: "Money In",
    icon: BanknotesIcon,
    amount: "SGD 0",
    lastMonth: "-20",
  },
  {
    name: "Money Out",
    icon: FireIcon,
    amount: "SGD 0",
    lastMonth: "50",
  },
  {
    name: "Suggested Daily Spending",
    icon: LightBulbIcon,
    amount: "SGD 0",
    lastMonth: "-3",
  },
];

export default function Card(props) {
  const { currentUser } = useAuth();
  const [uid, setUid] = useState("");
  const [summary, setSummary] = useState(cards);
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
      setFlag(true);
    }
  }, [currentUser]);

  const getSummary = async () => {
    const response = await fetch("/api/dashboard?userId=" + uid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((e) => e.json());
    const newSummary = summary;
    const currency = response.currency;
    newSummary[0].amount = currency + " " + response.budgetLeft;
    newSummary[1].amount = currency + " " + response.moneyIn;
    newSummary[2].amount = currency + " " + response.moneyOut;
    newSummary[3].amount = currency + " " + response.daily;
    setFetched(true);
    // setSummary(() => newSummary);
    setSummary(newSummary);
  };

  useEffect(() => {
    if (flag) {
      getSummary();
    }
  });

  if (!fetched) return <Loading />;

  return (
    <Fragment>
      <div className="min-h-full">
        <div className="flex flex-col">
          <main className="flex-1 pb-8">
            {/* Card Row */}
            <div className="mt-8">
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card */}
                {summary.map((card, Idx) => (
                  <div
                    key={card.name}
                    className="bg-white overflow-visible shadow rounded-lg"
                  >
                    <div className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <card.icon
                            className="h-6 w-6 text-gray-500"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500">
                              {card.name}
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {card.amount}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {desc[Idx]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
