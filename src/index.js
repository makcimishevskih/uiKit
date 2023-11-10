import MyButton from './components/MyButton'
import MyCheckbox from './components/MyCheckbox'
import MyCheckboxGroup from './components/MyCheckboxGroup'
import MyCircle from './components/MyCircle'
import MyProgress from './components/MyProgress'
import MyRadio from './components/MyRadio'
import MyTable from './components/MyTable'

const vueUiKitBasic = {
  install(Vue) {
    Vue.component('my-radio', MyRadio)
    Vue.component('my-table', MyTable)
    Vue.component('my-button', MyButton)
    Vue.component('my-circle', MyCircle)
    Vue.component('my-progress', MyProgress)
    Vue.component('my-checkbox', MyCheckbox)
    Vue.component('my-checkboxGroup', MyCheckboxGroup)
  }
}

export default vueUiKitBasic
