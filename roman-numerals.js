const Converter = (function () {
  /**
   * @param {*} input
   * @returns {Boolean}
   */
  function isInvalidValue(input) {
    return input === null || input === '';
  }

  /**
   * @param {Number} number
   * @returns {Boolean}
   */
  function isOutOfRange(number) {
    return typeof number === 'number' && number < 1 || number > 3999;
  }

  // constructor
  function RomanArabicConverter(number) {
    if (this instanceof RomanArabicConverter !== true) {
      return new RomanArabicConverter(number);
    }

    if (isInvalidValue(number)) {
      throw new Error('value required');
    }

    if (isOutOfRange(number)) {
      throw new Error('invalid range');
    }
  }

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
  }
];

testCases.forEach((testCase, i) => {
  const { input, output } = testCase;

  try {
    const numberConverter = new Converter(input);
  } catch (error) {
    console.log(
      `${i + 1}. For ${input} it should throw ${output}: ${error.message === output}`
    );
  }
});
