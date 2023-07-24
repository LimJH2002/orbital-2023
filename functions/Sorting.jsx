import { DateTime } from "luxon";

export default function SortingDate(arr) {
  return arr != null
    ? arr.sort((a, b) => {
      // console.log("ab", a, b)
        const beforeDate = DateTime.fromFormat(a.date, "yyyy-d-m");
        const afterDate = DateTime.fromFormat(b.date, "yyyy-d-m");
        return afterDate - beforeDate;
      })
    : arr;
}
