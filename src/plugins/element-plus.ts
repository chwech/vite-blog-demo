import { App } from 'vue'
import '../styles/element-variables.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default (app: App): void => {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}
