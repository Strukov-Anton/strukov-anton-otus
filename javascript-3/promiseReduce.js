async function promiseReduce(asyncFunctions, reduce, initialValue) {
  const res = await Promise.all(asyncFunctions.map((func) => func()))
  return res.reduce(reduce, initialValue)
}

// Check
const fn1 = () =>
  new Promise((resolve) => {
    console.log('fn1')
    setTimeout(() => resolve(1), 1000)
  })

const fn2 = () => {
  console.log('fn2')
  return Promise.resolve(2)
}

const result = await promiseReduce(
  [fn1, fn2],
  function (memo, value) {
    console.log('reduce')
    return memo * value
  },
  1
)

console.log(result)
