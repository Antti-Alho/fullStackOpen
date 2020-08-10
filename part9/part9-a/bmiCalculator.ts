export const calculateBmi = (height: number, weight: number): string => {
  height = height * 0.01;
  const bmi: number = (weight/(height*height));

  if (bmi < 15){
    return ('Very severely underweight');
  } else if (15 <= bmi && bmi < 16) {
    return ('Severely underweight ');
  } else if (16 <= bmi && bmi < 18.5) {
    return ('Underweight ');
  } else if (18.5 <= bmi && bmi < 25) {
    return ('Normal (healthy weight) ');
  } else if (25 <= bmi && bmi < 30) {
    return ('Overweight ');
  } else if (30 <= bmi && bmi < 35) {
    return ('Obese Class I (Moderately obese) ');
  } else if (35 <= bmi && bmi < 40) {
    return ('Obese Class II (Severely obese) ');
  } else if (40 <= bmi) {
    return ('Obese Class III (Very severely obese) ');
  } else {
    return '';
  }
};

export const parseArgs = (argv: Array<string>): string => {
  const list: number[] = argv.slice(2).map(n => Number(n));
  if (list.some((n) => !isNaN(n))) {
    return calculateBmi(list[0], list[1]);
  } else {
    throw new Error('Not a number >:(');
  }
};

export default { calculateBmi };