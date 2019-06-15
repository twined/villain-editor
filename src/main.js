import Vue from 'vue'
import Sortable from 'sortablejs'
import App from './App.vue'
import './styles/app.scss'

Vue.config.productionTip = false

Vue.directive('sortable', {
  inserted: function (el, binding) {
    const s = new Sortable(el, binding.value || {})
    return s
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
