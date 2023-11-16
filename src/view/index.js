// //组件入口
import * as components from '../components/index'
import '../assets/base.css'
export const install = {
  install: (app) => {
    for (const componentName in components) {
      const component = components[componentName]
      app.component(component.name, component)
    }
  }
}

export { components }
