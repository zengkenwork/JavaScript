let numberHelper = {
  isInt: function (num) {
    if (num instanceof Number) {
      return num !== Nan && Number.isInteger(num.valueof());
    }
    return Number.isInteger(num);
  },
};
let stringHelper = {
  tryParseFloat: function (str) {
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
  },
  tryParseInt: function (str) {
    let result = {
      isValid: false,
      value: 0,
      error: "",
    };

    let floatResult = this.tryParseFloat(str);
    if (!floatResult.isValid) return result;

    if (!numberHelper.isInt(floatResult.value)) {
      result.error = "無法順利轉為整數";
      return result;
    }

    result.isValid = true;
    result.value = floatResult.value;

    return result;
  },
};
