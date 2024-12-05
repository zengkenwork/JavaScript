function tryParseFloat(str) {
  let result = {
    isValid: false,
    value: 0,
  };

  let num = Number(str);

  if (isNaN(str) == false) {
    result.isValid = true;
    result.value = num;
  }
  return result;
}
