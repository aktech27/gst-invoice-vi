const formatToArray = (n) => {
  let arr = [];
  let threes = n.substring(n.length - 3, n.length);
  arr.push(threes.substring(1, 3));
  arr.push(threes.substring(0, 1));
  n = n.substring(0, n.length - 3);
  while (n != "") {
    let twos = n.substring(n.length - 2, n.length);
    arr.push(twos);
    n = n.substring(0, n.length - 2);
  }
  return arr;
};

const inWords = (number) => {
  const map = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "nighty",
  };
  number = parseInt(number);
  if (map.hasOwnProperty(number)) return map[number];
  else {
    return inWords(parseInt(number / 10) * 10) + " " + inWords(number % 10);
  }
};

function numToWords(currency) {
  console.log(currency);
  if (currency > 99) {
    let result = "";

    let [tens, hundred, thousand, lakh, crore] = formatToArray(currency.toString().split(".")[0]);
    if (crore && crore != "00") result += `${inWords(crore)} Crores `;
    if (lakh && lakh != "00") result += `${inWords(lakh)} Lakhs `;
    if (thousand && thousand != "00") result += `${inWords(thousand)} Thousand `;
    if (hundred && hundred != "0") result += `${inWords(hundred)} Hundred `;
    if (tens && tens != "00") result += `and ${inWords(tens)}`;
    return result + " rupees only";
  } else {
    return inWords(currency) + " rupees only";
  }
}

module.exports = numToWords;
