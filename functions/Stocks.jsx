export function checkDuplicates(element, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (element === arr[i].s) {
      return true;
    }
  }
  return false;
}