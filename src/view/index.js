// //组件入口
import * as components from '../components/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

export const install = {
  install: (app) => {
    for (const componentName in components) {
      const component = components[componentName]
      app.component(component.name, component)
    }
    app.use(Antd)
  }
}

export { components }
