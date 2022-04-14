import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

const files = require.context('./modules/', false, /\.ts$/),
  modules = files.keys().reduce((pre: any, cur: any) => {
    const moduleName = cur.replace(/^\.\/(.*)\.ts$/, '$1')
    return {
      ...pre,
      [moduleName]: files(cur).default
    }
  }, {})

export default createStore({
  strict: import.meta.env.VUE_APP_DG_ENV === 'development',
  modules,
  getters,
  plugins: [createPersistedState({
    paths: ['app', 'user']
  })]
})
