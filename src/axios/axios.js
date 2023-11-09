import axios from 'axios'

// 创建一个自定义的 Axios 实例，可以在此配置默认请求头、拦截器等
const customAxios = axios.create({
  baseURL: 'http://localhost:1337' // 设置基本URL
  // headers: {
  //   'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
  //   'Content-Type': 'application/json; charset=utf-8',
  //   Accept: '*/*',
  //   Host: 'localhost:1337',
  //   Connection: 'keep-alive'
  // }
})

// 创建一个发送邮件请求的函数
const sendEmail = (data) => {
  return customAxios.post('/sendemail', data)
}

export { sendEmail }
