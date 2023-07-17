export default function MonthName() {
  const date = new Date(Date.now());

  return date.toLocaleString("en-US", { month: "long" });
}
