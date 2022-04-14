import store from '@/store'
import {
  APP_CLOSE_SIDEBAR,
  APP_TOGGLE_DEVICE
} from '@/store/mutation-types'
const { body } = document,
  WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route () {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch(`app/${APP_CLOSE_SIDEBAR}`, { withoutAnimation: false })
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted () {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch(`app/${APP_TOGGLE_DEVICE}`, 'mobile')
      store.dispatch(`app/${APP_CLOSE_SIDEBAR}`, { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch(`app/${APP_TOGGLE_DEVICE}`, isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch(`app/${APP_CLOSE_SIDEBAR}`, { withoutAnimation: true })
        }
      }
    }
  }
}
