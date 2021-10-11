async function promiseReduce(asyncFunctions, reduce, initialValue) {
  return asyncFunctions.reduce(async (acc, asyncFunc) => {
    const getAccValue = await acc
    const getAsyncFuncValue = await asyncFunc()

    return Promise.resolve(reduce(getAccValue, getAsyncFuncValue))
  }, Promise.resolve(initialValue))
}

// Check
const fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

const fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

const result = await promiseReduce(
  [fn1, fn2],
  function (memo, value) {
    console.log('reduce')
    return memo * value
  },
  1
)

console.log(result)
