export function checkDuplicates(element, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (element === arr[i].s) {
      return true;
    }
  }
  return false;
}

export function sortStock(arr) {
  return arr.sort((a, b) => {
    const symbolA = a.s.split(":")[1];
    const symbolB = b.s.split(":")[1];

    if (symbolA < symbolB) {
      return -1;
    }
    if (symbolA > symbolB) {
      return 1;
    }
    return 0; // symbols are equal
  });
}
