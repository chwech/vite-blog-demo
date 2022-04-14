<template>
  <section class="app-main">
    <section class="app-main-container">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="$_appStore_caches">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </section>
  </section>
</template>

<script>
import appStore from '@/store/mixin/app'

export default {
  name: 'AppMain',
  mixins: [appStore],
  computed: {
    key () {
      return this.$route.path
    }
  },
  watch: {
    $route () {
      this.$_appStore_addCache(this.$route)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  height: 100vh;
  padding-top: 50px;
  position: relative;
  overflow: hidden;
  &-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    background: #f5f5f5;
  }
  .router-view {
    height: 100%;
    overflow-y: auto;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
