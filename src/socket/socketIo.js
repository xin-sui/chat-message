import { io } from 'socket.io-client'

let sokcetUrl = 'https://fb.webguru188.xyz'
// let sokcetUrl = 'http://localhost:1337'
let socket = io(sokcetUrl, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export { socket }
