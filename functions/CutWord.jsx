export default function CutWord(text) {
  if (text.length > 62) {
    return text.substring(0, 60) + "...";
  } else {
    const remaining = 62 - text.length;
    return text + "".repeat(remaining);
  }
}
