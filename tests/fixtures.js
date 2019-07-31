export function removeNbsp(string) {
  return string.replace(/[\u202F\u00A0]/, " ");
}
