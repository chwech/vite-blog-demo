import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import installElementPlus from './plugins/element-plus'
import {registerIcons} from '@/icons'
import DgAdminComponent from '@degon/admin-component-vue3'


const app = createApp(App)
installElementPlus(app)
registerIcons(app)
app
  .use(store)
  .use(router)
  .use(DgAdminComponent)
  .mount('#app')
