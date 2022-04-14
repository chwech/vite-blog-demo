<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render () {
    const { icon, title } = this.$props,
      vnodes = []
    if (icon.includes('el-icon')) {
      vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    } else {
      // vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<>{title}</>)
    }
    return vnodes
  }
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
