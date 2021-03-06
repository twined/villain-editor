<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-template-description">
      {{ getBlockName }}
    </div>
    <component :is="buildWrapper()" />
    <template slot="config">
      <div class="form-group">
        <label>Refererte blokker [{{ block.data.refs.length }}]</label>
        <table class="table villain-block-datatable-table">
          <tbody>
            <tr
              v-for="(ref, idx) in block.data.refs"
              :key="idx"
              class="villain-template-config-ref">
              <td>{{ ref.name }}</td>
              <td style="float: right;">
                <button
                  type="button"
                  class="btn btn-primary text-white d-flex"
                  @click="replaceRefWithSource(ref)">
                  <IconRefresh
                    class="mr-2"
                    style="height: 25px; width: 25px;" /> <span>Erstatt med referanseblokk</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </Block>
</template>

<script>

import Vue from 'vue'
import IconRefresh from '../../icons/IconRefresh'

export default {
  name: 'TemplateBlock',

  components: {
    IconRefresh
  },

  props: {
    block: {
      type: Object,
      default: () => {}
    },

    parent: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      customClass: '',
      uid: null
    }
  },

  inject: [
    'available',
    'refresh'
  ],

  computed: {
    getBlockName () {
      if (this.block.data.name) {
        return this.block.data.name
      }

      let foundTemplate
      const id = this.block.data.id

      if (id) {
        foundTemplate = this.available.templates.find(t => t.data.id === id)
      }

      if (!foundTemplate) {
        return '?'
      }

      return foundTemplate.data.name
    }
  },

  created () {
    console.debug('<TemplateBlock /> created')
    this.deleteProps()
    this.createTemplateContentWrapperComponent()
  },

  methods: {
    replaceRefWithSource (ref) {
      let foundTemplate = this.available.templates.find(t => t.data.id === this.block.data.id)
      let foundRef = foundTemplate.data.refs.find(r => r.name === ref.name)

      // replace our ref with foundRef
      let refIdx = this.block.data.refs.indexOf(ref)

      const newRefs = [
        ...this.block.data.refs.slice(0, refIdx),
        foundRef,
        ...this.block.data.refs.slice(refIdx + 1)
      ]

      this.$set(this.block.data, 'refs', newRefs)
      this.refresh(false)
    },

    /** remove props we don't want to store */
    deleteProps () {
      // only delete props here if we don't have an ID
      if (!this.block.data.hasOwnProperty('id')) {
        return
      }

      if (this.block.data.hasOwnProperty('namespace')) {
        this.$delete(this.block.data, 'namespace')
      }

      if (this.block.data.hasOwnProperty('code')) {
        this.$delete(this.block.data, 'code')
      }

      if (this.block.data.hasOwnProperty('class')) {
        this.$delete(this.block.data, 'class')
      }

      if (this.block.data.hasOwnProperty('name')) {
        this.$delete(this.block.data, 'name')
      }

      if (this.block.data.hasOwnProperty('help_text')) {
        this.$delete(this.block.data, 'help_text')
      }
    },

    getSourceCode () {
      let foundTemplate
      const id = this.block.data.id

      if (!id) {
        foundTemplate = this.available.templates.find(t => t.data.class === this.block.data.class)
      } else {
        foundTemplate = this.available.templates.find(t => t.data.id === id)
      }

      if (!foundTemplate) {
        console.error('==> missing template', this.block.data)
        return '<div>!! template not found !!</div>'
      }

      this.$set(this.block.data, 'id', foundTemplate.data.id)
      this.deleteProps()
      return foundTemplate.data.code
    },

    replaceRefs () {
      let srcCode = this.getSourceCode()
      let replacedRefsCode = srcCode.replace(/%{(\w+)}/g, this.replaceRef)

      return replacedRefsCode
    },

    replaceRef (exp, refName) {
      return `<slot name="${refName}">REPLACE</slot>`
    },

    findRef (refName) {
      return this.block.data.refs.find(r => r.name === refName)
    },

    buildData () {
      // build it by {refname: data}
      let refs = {}
      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        refs[ref.name] = { ...ref.data, locked: true }
      }

      return {
        refs
      }
    },

    buildSlots () {
      let template = ''
      this.copyMissingRefs()

      for (let i = 0; i < this.block.data.refs.length; i++) {
        let ref = this.block.data.refs[i]
        template += `<div slot="${ref.name}"><component is="${ref.data.type}Block" :block="refs.${ref.name}" /></div>`
      }
      return template
    },

    copyMissingRefs () {
      let foundTemplate
      const id = this.block.data.id

      if (!id) {
        foundTemplate = this.available.templates.find(t => t.data.class === this.block.data.class)
      } else {
        foundTemplate = this.available.templates.find(t => parseInt(t.data.id) === parseInt(this.block.data.id))
      }

      if (!foundTemplate) {
        console.error('VILLAIN: template not found')
        return
      }

      let templateSourceRefs = foundTemplate.data.refs
      let blockRefs = this.block.data.refs

      for (let i = 0; i < templateSourceRefs.length; i++) {
        if (!blockRefs.find(b => b.name === templateSourceRefs[i].name)) {
          this.block.data.refs = [
            ...this.block.data.refs,
            templateSourceRefs[i]
          ]
        }
      }
    },

    buildWrapper () {
      const builtSlots = this.buildSlots()
      let template = `
        <TemplateContentWrapper>
          ${builtSlots}
        </TemplateContentWrapper>
      `

      let data = this.buildData()

      return {
        name: 'buildwrapper',
        template,
        data () {
          return data
        }
      }
    },

    createTemplateContentWrapperComponent () {
      Vue.component('TemplateContentWrapper', {
        template: this.replaceRefs()
      })
    }
  }
}
</script>
