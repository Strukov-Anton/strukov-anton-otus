function sum() {
  let result = 0
  return function calculate(number) {
    if (number == null) return result

    result += number

    return calculate
  }
}


// Check
const getSum = sum()

getSum(1)(3)(3)(5)(5)(1)() // 18
