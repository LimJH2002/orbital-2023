import { DateTime } from "luxon";

export default function SortingDate(arr) {
  return arr.sort((a, b) => {
    const beforeDate = DateTime.fromFormat(a.date, "yyyy-m-d");
    const afterDate = DateTime.fromFormat(b.date, "yyyy-m-d");
    return afterDate - beforeDate;
  });
}
