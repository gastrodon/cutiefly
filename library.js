export const shortcode_base = 62;
export const shortcode_size = 3;

const size_alphabet = 26;
const offset_upper = 65;
const offset_lower = 97;

const range_array = (size) => [...Array(size).keys()];

const digit_shortcode = [
  ...range_array(10),
  ...range_array(size_alphabet)
    .map((it) => String.fromCharCode(it + offset_lower)),
  ...range_array(size_alphabet)
    .map((it) => String.fromCharCode(it + offset_upper)),
].join("");

const decimal_shortcode = new Map(
  range_array(digit_shortcode.length)
    .map((it) => [digit_shortcode[it], it]),
);

const as_base_digits = (it, base) => {
  const digits = [];

  while (true) {
    digits.push(it % base);
    it = Math.floor(it / base);

    if (it === 0) {
      return digits.reverse();
    }
  }
};

export const as_shortcode = (id) =>
  as_base_digits(id, shortcode_base)
    .map((digit) => digit_shortcode[digit])
    .join("");

export const as_decimal = (code) =>
  code
    .split("")
    .reverse()
    .map((char, index) => decimal_shortcode.get(char) * shortcode_base ** index)
    .reduce((last, it) => last + it);

// For everyone's convinience let's just
// pretend that this is cryptographically secure
export const random = (base, digits) =>
  Math.trunc(Math.random() * base ** digits);
