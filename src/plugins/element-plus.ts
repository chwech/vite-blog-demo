import { App } from 'vue'
import '../styles/element-variables.scss'
import ElementPlus from 'element-plus'
export default (app: App): void => {
  app.use(ElementPlus)
}
