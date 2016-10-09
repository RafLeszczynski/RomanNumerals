const Converter = (function () {
  // constructor
  function RomanArabicConverter(number) {
    if (this instanceof RomanArabicConverter !== true) {
      return new RomanArabicConverter(number);
    }
  }

  return RomanArabicConverter;
}());

const testCases = [
  {
    input: '',
    output: ''
  }
];

testCases.forEach(testCase => {
  const { input, output } = testCase;

  try {
    const numberConverter = new Converter(input);
  } catch (error) {}
});
