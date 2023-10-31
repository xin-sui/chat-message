import { io } from 'socket.io-client'

// const URL = "https://fb.webguru188.xyz";
let sokcetUrl = 'http://localhost:1337'
let socket = io(sokcetUrl, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})
// 创建一个函数，用于动态修改Socket.IO客户端的URL地址
function setSocketUrl(newUrl) {
  // 关闭当前连接
  socket.disconnect()

  // 更新URL
  sokcetUrl = newUrl

  // 重新连接到新的URL
  socket = io(sokcetUrl, { autoConnect: false })
  socket.onAny((event, ...args) => {
    console.log(event, args)
  })
}

export { socket, setSocketUrl }
