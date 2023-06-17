export const months = [
  { name: "All Month", value: "0" },
  { name: "January", value: "01" },
  { name: "February", value: "02" },
  { name: "March", value: "03" },
  { name: "Apirl", value: "04" },
  { name: "May", value: "05" },
  { name: "June", value: "06" },
  { name: "July", value: "07" },
  { name: "August", value: "08" },
  { name: "September", value: "09" },
  { name: "October", value: "10" },
  { name: "November", value: "11" },
  { name: "December", value: "12" },
];

let current = new Date();
export let year = current.getFullYear();
export let month = current.getMonth();

export const years = ["All Year"];
while (year >= 2020) {
  years.push(year--);
}
