// // let str = '123456789';

// // console.log(str.substr(0,5))

// function fn(a = 19) {
//   console.log(a)
// }

// fn()
// fn(20)

var interval = setInterval(() => {
  console.log('inteval running')
  clearInterval(interval)
}, 1000)
// setTimeout(() => {
//   console.log('interval cleared')
//   clearInterval(interval)
// }, 5000)