import components from './components'

const vueUiKitBasic = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.__name, component)
    })
  }
}

export default vueUiKitBasic
