<template>
  <div class="villain-builder-wrapper">
    <div class="villain-builder-header">
      <span class="text-mono">
        <template v-if="currentTemplate">
          Editérer {<strong> {{ currentTemplate.data.class }} </strong>}
        </template>
      </span>
    </div>

    <div class="villain-builder-editor-wrapper">
      <div
        id="builder-template"
        class="villain-builder-editor">
      </div>
    </div>

    <aside class="villain-builder-content-aside">
      <div class="villain-builder-aside-header">
        Maler
      </div>
      <transition-group
        v-sortable="{handle: 'li', animation: 500, store: {get: getOrder, set: storeOrder}}"
        name="fade-move"
        tag="ul">
        <button
          key="createTemplateButton"
          class="btn btn-primary btn-block mb-2"
          @click="createTemplate">
          Ny mal
        </button>

        <li
          v-for="t in templates"
          :data-id="t.data.id"
          :key="t.data.id"
          class="text-mono"
          @click="selectTemplate(t)">
          {{ t.data.class }}
        </li>
      </transition-group>
    </aside>

    <div class="villain-builder-refs">
      <div
        id="builder-ref"
        class="villain-builder-ref">
      </div>
    </div>

    <aside class="villain-builder-refs-aside">
      <template v-if="currentTemplate && currentTemplate.data.refs">
        <div class="villain-builder-aside-header">
          REFs
        </div>
        <ul>
          <button
            :disabled="currentTemplate === null"
            class="btn btn-primary btn-block mb-2"
            @click="showBlockPicker = true">
            Ny REF
          </button>
          <li
            v-for="ref in currentTemplate.data.refs"
            :key="ref.name"
            class="text-mono"
            @click="selectRef(ref)">
            %{<strong>{{ ref.name }}</strong>}
            <button
              v-if="prevRefName === ref.name"
              class="btn btn-outline-secondary btn-sm"
              @click.prevent.stop="saveRef()">Lagre</button>
          </li>
        </ul>
      </template>
    </aside>
    <div class="villain-builder-footer">
      <div
        v-if="!showBlockPicker && !showNamer && currentTemplate"
        class="villain-builder-block-attributes">
        <label class="float-left">Klasse</label>
        <input
          v-model="currentTemplate.data.class"
          class="form-control float-left d-inline"
          type="input">
        <label class="float-left">Navn</label>
        <input
          v-model="currentTemplate.data.name"
          class="form-control float-left d-inline"
          type="input">
        <label class="float-left">Kategori</label>
        <input
          v-model="currentTemplate.data.namespace"
          class="form-control float-left d-inline"
          type="input">
        <label class="float-left">Hjelpetekst</label>
        <input
          v-model="currentTemplate.data.help_text"
          class="form-control float-left d-inline"
          type="input">
      </div>
      <div
        v-if="showBlockPicker"
        class="villain-builder-block-picker">
        <div class="villain-builder-block-picker-available">
          <div
            v-for="b in available.blocks"
            :key="b.name"
            class="villain-editor-plus-available-block"
            @mouseover="setHover(b.name)"
            @click="addBlock(b)">
            <div>
              <i
                :class="b.icon"
                class="fa fa-fw"
              />
            </div>
          </div>
        </div>
        <div class="villain-builder-block-picker-header">
          &rarr; {{ hoveredBlock }}
        </div>
      </div>
      <div
        v-if="showNamer"
        class="villain-builder-block-picker-namer">
        <label class="float-left">Navngi ref</label>
        <input
          v-model="refName"
          class="form-control float-left d-inline"
          type="input">
        <button
          class="btn btn-outline-secondary float-left"
          @click="saveName">
          Opprett ref
        </button>
      </div>
      <div class="villain-builder-save-wrapper">
        <button
          class="btn btn-outline-primary"
          @click="saveTemplate()">
          Lagre
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import CodeFlask from 'codeflask'
import fetchTemplates from '@/utils/fetchTemplates'
import storeTemplate from '@/utils/storeTemplate'
import storeTemplateSequence from '@/utils/storeTemplateSequence'

export default {
  data () {
    return {
      hoveredBlock: 'Velg blokk',
      showBlockPicker: false,
      showNamer: false,
      showTemplateAttrs: false,
      codeFlask: null,
      refFlask: null,
      refName: '',
      currentTemplate: null,
      currentRef: null,
      prevRefName: null,
      templates: [],
      templateSequence: []
    }
  },

  inject: [
    'available',
    'headers',
    'urls'
  ],

  async mounted () {
    this.templates = await fetchTemplates('all', this.headers.extra, this.urls.templates)
    this.codeFlask = new CodeFlask('#builder-template', { language: 'html', lineNumbers: true })
    this.refFlask = new CodeFlask('#builder-ref', { language: 'javascript', lineNumbers: true })
  },

  methods: {
    getOrder (sortable) {
      return this.templateSequence
    },

    storeOrder (sortable) {
      this.templateSequence = sortable.toArray()
      storeTemplateSequence(this.templateSequence, this.headers.extra, this.urls.templateSequence)
    },

    createTemplate () {
      const template = {
        type: 'template',
        data: {
          class: 'v-classname-here',
          code: '<div class="wrapper"></div>',
          help_text: 'Hjelpetekst',
          name: 'Navn på mal',
          namespace: 'general',
          refs: []
        }
      }

      this.resetRef()
      this.currentTemplate = template
      this.codeFlask.updateCode(template.data.code)
    },

    setHover (name) {
      this.hoveredBlock = name
    },

    saveName () {
      this.currentRef.name = this.refName
      this.refName = ''
      this.showNamer = false

      this.refFlask.updateCode(JSON.stringify(this.currentRef, null, 2))

      this.currentTemplate.data.refs = [
        ...this.currentTemplate.data.refs,
        this.currentRef
      ]

      this.selectRef(this.currentRef)
    },

    saveRef () {
      // get this ref
      const newRef = JSON.parse(this.refFlask.getCode())
      // find ref to replace
      const oldRef = this.currentTemplate.data.refs.find(r => r.name === this.prevRefName)
      if (oldRef) {
        let idx = this.currentTemplate.data.refs.indexOf(oldRef)
        if (idx >= 0) {
          this.currentTemplate.data.refs = [
            ...this.currentTemplate.data.refs.slice(0, idx),
            newRef,
            ...this.currentTemplate.data.refs.slice(idx + 1)
          ]
          this.resetRef()
        }
      }
    },

    resetRef () {
      this.currentRef = {}
      this.prevRefName = null
      this.refFlask.updateCode('')
    },

    addBlock (b) {
      const ref = {
        name: b.component.toUpperCase(),
        data: { type: b.component.toLowerCase(), data: b.dataTemplate }
      }

      this.currentRef = { ...ref }
      this.showNamer = true
      this.showBlockPicker = false
    },

    selectTemplate (t) {
      this.resetRef()
      this.currentTemplate = t
      this.codeFlask.updateCode(this.currentTemplate.data.code)
    },

    selectRef (r) {
      this.currentRef = { ...r }
      this.prevRefName = this.currentRef.name
      this.refFlask.updateCode(JSON.stringify(this.currentRef, null, 2))
    },

    async saveTemplate () {
      this.currentTemplate = {
        ...this.currentTemplate,
        data: {
          ...this.currentTemplate.data,
          code: this.codeFlask.getCode()
        }
      }

      let result = await storeTemplate(this.currentTemplate, this.headers.extra, this.urls.templates)
      if (result.status === 200) {
        this.templates = await fetchTemplates('all', this.headers.extra, this.urls.templates)
      }
    }
  }
}
</script>
