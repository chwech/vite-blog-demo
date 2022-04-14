import { mapActions, mapState } from 'vuex'
import { APP_ADD_CACHE } from '../mutation-types'
export default {
  computed: {
    ...mapState('app', {
      $_appStore_caches: 'caches'
    })
  },
  methods: {
    ...mapActions('app', {
      $_appStore_addCache: APP_ADD_CACHE
    })
  }
}
