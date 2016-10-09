const Converter = (function () {
  const romanToArabicNumbers = { I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50,
    XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000 };
  const arabicToRomanNumbers = Object.keys(romanToArabicNumbers)
    .reduce((obj, key) => Object.assign({}, obj, { [romanToArabicNumbers[key]]: key }), {});

  /**
   * @param {*} input
   * @returns {Boolean}
   */
  function isNoValue(input) {
    return input === null || input === '';
  }

  /**
   * @param {*} input
   * @returns {Boolean}
   */
  function isInvalidValue(input) {
    const pattern = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;

    return typeof input !== 'number' && typeof input !== 'string' ||
        !Number.isInteger(input) && !pattern.test(input);
  }

  /**
   * @param {Number} number
   * @returns {Boolean}
   */
  function isOutOfRange(number) {
    return number < 1 || number > 3999;
  }

  /**
   * @param {Number} length
   * @param {String} char
   * @returns {Array.<String>}
   */
  function getArrayOfChars(length, char) {
    return new Array(length).fill(char);
  }

  /**
   * @param {Number} number
   * @returns {Array.<String>}
   */
  function breakNumberToArrayOfParts(number) {
    return String(number)
      .split('')
      .reverse()
      .map((value, index) => value + getArrayOfChars(index, '0').join(''))
      .reverse()
  }

  /**
   * @param {String} numberAsString
   * @returns {String|Array.<String>}
   */
  function breakNumberToRomanValuesInArabic(numberAsString) {
    const digit = Number(numberAsString[0]);
    const zeros = numberAsString.slice(1);

    switch (true) {
      case digit === 0:
        return '';
      case digit < 4:
        return getArrayOfChars(digit, `1${zeros}`);
      case digit > 5 && digit < 9:
        return [`5${zeros}`, ...getArrayOfChars(digit - 5, `1${zeros}`)];
      default:
        return `${digit}${zeros}`
    }
  }

  // constructor
  function RomanArabicConverter(number) {
    if (this instanceof RomanArabicConverter !== true) {
      return new RomanArabicConverter(number);
    }

    if (isNoValue(number)) {
      throw new Error('value required');
    }

    if (isInvalidValue(number)) {
      throw new Error('invalid value')
    }

    if (isOutOfRange(number)) {
      throw new Error('invalid range');
    }

    this.number = number;
  }

  RomanArabicConverter.prototype.toRoman = function () {
    return breakNumberToArrayOfParts(this.number)
      .map(breakNumberToRomanValuesInArabic)
      .join()
      .split(',')
      .map(value => arabicToRomanNumbers[value])
      .join('');
  };

  RomanArabicConverter.prototype.toArabic = function () {
    return romanToArabicNumbers[this.number];
  };

  return RomanArabicConverter;
}());

const testCases = [
  {
    input: null,
    output: 'value required'
  },
  {
    input: '',
    output: 'value required'
  },
  {
    input: 0,
    output: 'invalid range'
  },
  {
    input: 10000,
    output: 'invalid range'
  },
  {
    input: 'CD1X',
    output: 'invalid value'
  },
  {
    input: 'error',
    output: 'invalid value'
  },
  {
    input: 'MMMMDMXCIX',
    output: 'invalid value'
  },
  {
    input: 1,
    output: 'I'
  },
  {
    input: 3,
    output: 'III'
  },
  {
    input: 4,
    output: 'IV'
  },
  {
    input: 5,
    output: 'V'
  },
  {
    input: 1968,
    output: 'MCMLXVIII',
  },
  {
    input: 1473,
    output: 'MCDLXXIII',
  },
  {
    input: 2999,
    output: 'MMCMXCIX',
  },
  {
    input: 3000,
    output: 'MMM',
  },
  {
    input: 'I',
    output: 1,
  }
];

testCases.forEach((testCase, i) => {
  const { input, output } = testCase;

  try {
    const numberConverter = new Converter(input);
    const convertedNumber = typeof input === 'number' ?
      numberConverter.toRoman(input) :
      numberConverter.toArabic(input);

    console.log(
      `${i + 1}. For ${input} it should return ${output}: ${convertedNumber === output}`
    );
  } catch (error) {
    console.log(
      `${i + 1}. For ${input} it should throw ${output}: ${error.message === output}`
    );
  }
});
