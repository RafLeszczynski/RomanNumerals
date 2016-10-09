const Converter = (function () {
  // constructor
  function RomanArabicConverter(number) {
    if (this instanceof RomanArabicConverter !== true) {
      return new RomanArabicConverter(number);
    }

    if (number === null) {
      throw new Error('value required');
    }
  }

  return RomanArabicConverter;
}());

const testCases = [
  {
    input: null,
    output: 'value required'
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
