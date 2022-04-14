import * as elIcons from '@element-plus/icons-vue'
import {App} from 'vue'

export function registerIcons (app: App) {
  for (const [name, icon] of Object.entries(elIcons)) {
    app.component(name, icon)
  }
}