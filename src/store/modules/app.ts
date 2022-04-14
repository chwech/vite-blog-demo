import {
  APP_ADD_CACHE,
  APP_TOGGLE_SIDEBAR,
  APP_CLOSE_SIDEBAR,
  APP_TOGGLE_DEVICE
} from '../mutation-types'

interface Sidebar {
  opened: boolean;
  withoutAnimation: boolean
}

interface State {
  sidebar: Sidebar;
  device: string;
  caches: string[];
}

interface Meta {
  cache: boolean;
}

interface Route {
  meta: Meta;
  name: string;
}

interface Commit {
  <T>(commitName: string, commitValue?: T): void;
}

export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    caches: [] // 缓存页面
  },
  mutations: {
    [APP_TOGGLE_SIDEBAR] (state: State) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    [APP_CLOSE_SIDEBAR] (state: State, withoutAnimation: boolean) {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    [APP_TOGGLE_DEVICE] (state: State, device: string) {
      state.device = device
    },
    [APP_ADD_CACHE] (state: State, route: Route) {
      if (state.caches.includes(route.name)) return
      if (route.meta.cache) {
        state.caches.push(route.name)
      }
    }
  },
  actions: {
    [APP_TOGGLE_SIDEBAR] ({ commit }: { commit: Commit }) {
      commit(APP_TOGGLE_SIDEBAR)
    },
    [APP_CLOSE_SIDEBAR] ({ commit }: { commit: Commit }, { withoutAnimation }: { withoutAnimation: boolean }) {
      commit(APP_CLOSE_SIDEBAR, withoutAnimation)
    },
    [APP_TOGGLE_DEVICE] ({ commit }: { commit: Commit }, device: string) {
      commit(APP_TOGGLE_DEVICE, device)
    },
    [APP_ADD_CACHE] ({ commit }: { commit: Commit }, route: Route) {
      commit(APP_ADD_CACHE, route)
    }
  }
}
