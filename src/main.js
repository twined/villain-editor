import Vue from 'vue'
import Sortable from 'sortablejs'
import App from './App.vue'
import './styles/app.scss'
import Quill from 'quill'

const Link = Quill.import('formats/link')
class linkType extends Link {
  static create (value) {
    let node = super.create(value)
    value = this.sanitize(value)

    if (value.startsWith('https://') || value.startsWith('http://')) {
      node.className = 'link--external'
    } else {
      node.removeAttribute('target')
    }
    return node
  }
}

Quill.register(linkType)

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
