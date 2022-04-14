import { GetterTree } from 'vuex'

interface Sidebar {
  opened: boolean;
  withoutAnimation: boolean
}

interface App {
  sidebar: Sidebar;
  device: boolean;
}

interface State {
  app: App;
}

const getters: GetterTree<State, unknown> = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}
export default getters
