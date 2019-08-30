<template>
  <div
    v-if="builderMode"
    class="villain-builder">
    <VillainBuilder />
  </div>
  <div
    v-else
    :class="fullscreen ? 'villain-fullscreen': ''"
    class="villain-editor">
    <div
      v-if="showAutosaves"
      class="villain-editor-autosave-list-popup">
      <strong>Autolagrede versjoner</strong>
      <div
        v-for="(a, idx) in autosaveEntries"
        :key="idx"
        class="villain-editor-autosave-list-popup-item">
        <div class="villain-editor-autosave-list-popup-item-date">
          <i class="fa fa-fw fa-file mr-2" /> {{ new Date(a.timestamp).toLocaleString('nb') }}
        </div>
        <button
          class="btn btn-outline-primary"
          @click.prevent="restoreAutosave(a)">
          Gjenopprett denne versjonen
        </button>
      </div>
    </div>
    <div class="villain-editor-toolbar">
      <div class="villain-editor-instructions">
        <i class="fa mr-2 fa-info-circle" />
        Trykk på "+" under for å legge til en innholdsblokk
      </div>
      <div class="villain-editor-controls float-right">
        <div class="villain-editor-autosave-status">
          {{ autosaveStatus }}
        </div>
        <div @click="toggleAutosaves">
          <i class="fas fa-fw fa-trash-restore" />
        </div>
        <div @click="toggleSource()">
          <template v-if="showSource">
            <i class="fa fa-fw fa-times" />
          </template>
          <template v-else>
            <i class="fa fa-fw fa-code" />
          </template>
        </div>
        <div @click="toggleFullscreen()">
          <template v-if="fullscreen">
            <i class="fa fa-fw fa-times" />
          </template>
          <template v-else>
            <i class="fa fa-fw fa-expand-arrows-alt" />
          </template>
        </div>
      </div>
    </div>
    <template
      v-if="showSource">
      <div class="villain-editor-source">
        <textarea
          ref="tasource"
          v-model="src" />
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-primary mt-4"
            @click="updateSource">
            Oppdatér
          </button>
        </div>
      </div>
    </template>
    <template
      v-else>
      <BlockContainer
        v-if="blocks && blocks.length"
        :blocks="blocks"
        @add="addBlock($event)"
        @move="moveBlock($event)"
        @delete="deleteBlock"
        @order="orderBlocks"
      />
      <BlockContainer
        v-else
        :blocks="blocks"
        @add="addBlock($event)"
        @move="moveBlock($event)"
        @delete="deleteBlock"
      />
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import autosize from 'autosize'
import cloneDeep from 'lodash/cloneDeep'
import VillainBuilder from '@/components/VillainBuilder'
import standardComponents from '@/components/blocks/standard'
import systemComponents from '@/components/blocks/system'
import toolsComponents from '@/components/blocks/tools'
import STANDARD_BLOCKS from '@/config/standardBlocks.js'
import fetchTemplates from '@/utils/fetchTemplates.js'
import { alertConfirm } from '@/utils/alerts'
import { addAutoSave, getAutoSaves } from '@/utils/autoSave.js'
import { AUTOSAVE_INTERVAL } from '@/config/autoSave.js'
import getTimestamp from '@/utils/getTimestamp.js'
import { TweenMax } from 'gsap'

for (let key in standardComponents) {
  if (standardComponents.hasOwnProperty(key)) {
    Vue.component(key, standardComponents[key])
  }
}

for (let key in systemComponents) {
  if (systemComponents.hasOwnProperty(key)) {
    Vue.component(key, systemComponents[key])
  }
}

for (let key in toolsComponents) {
  if (toolsComponents.hasOwnProperty(key)) {
    Vue.component(key, toolsComponents[key])
  }
}

export default {
  name: 'VillainEditor',

  components: {
    VillainBuilder
  },

  props: {
    builderMode: {
      type: Boolean,
      default: false
    },

    json: {
      type: [String, Array],
      default: '[]'
    },

    templateMode: {
      type: Boolean,
      default: false
    },

    server: {
      type: String,
      default: ''
    },

    baseURL: {
      type: String,
      default: '/admin/api/villain/'
    },

    browseURL: {
      type: String,
      default: '/admin/api/villain/browse/'
    },

    slideshowsURL: {
      type: String,
      default: '/admin/api/villain/slideshows/'
    },

    templatesURL: {
      type: String,
      default: '/admin/api/villain/templates/'
    },

    imageSeries: {
      type: String,
      default: 'post'
    },

    extraHeaders: {
      type: Object,
      default: () => {}
    },

    extraBlocks: {
      type: Array,
      default: () => []
    },

    visibleBlocks: {
      type: Array,
      default: () => []
    },

    templates: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      autosaveEntries: [],
      autosaveStatus: '',
      blocks: [],
      lastAutosavedAt: null,
      showAutosaves: false,
      showSource: false,
      fullscreen: false,
      availableTemplates: []
    }
  },

  computed: {
    src: {
      get () {
        let bx = cloneDeep(this.blocks)
        return JSON.stringify(bx.map(b => this.stripMeta(b)), null, 2)
      },

      set (v) {
        this.updatedSource = v
      }
    },

    availableBlocks () {
      let availableBlocks = STANDARD_BLOCKS

      if (this.extraBlocks.length) {
        availableBlocks = availableBlocks + STANDARD_BLOCKS
      }

      if (this.visibleBlocks.length) {
        // filter according to visibleBlocks
        availableBlocks = availableBlocks.filter(b => this.visibleBlocks.includes(b.component))
      }

      return availableBlocks
    }
  },

  provide () {
    const available = {}
    const headers = {}
    const urls = {}

    Object.defineProperty(available, 'blocks', {
      enumerable: true,
      get: () => this.availableBlocks
    })
    Object.defineProperty(available, 'templates', {
      enumerable: true,
      get: () => this.availableTemplates
    })

    Object.defineProperty(headers, 'extra', {
      enumerable: true,
      get: () => this.extraHeaders
    })

    /**
     * URLS
     */
    Object.defineProperty(urls, 'base', {
      enumerable: true,
      get: () => `${this.server}${this.baseURL}`
    })
    Object.defineProperty(urls, 'browse', {
      enumerable: true,
      get: () => `${this.server}${this.browseURL}`
    })
    Object.defineProperty(urls, 'slideshows', {
      enumerable: true,
      get: () => `${this.server}${this.slideshowsURL}`
    })
    Object.defineProperty(urls, 'templates', {
      enumerable: true,
      get: () => `${this.server}${this.templatesURL}`
    })

    return {
      vImageSeries: this.imageSeries,
      vTemplateMode: this.templateMode,
      available,
      headers,
      urls
    }
  },

  watch: {
    blocks: {
      handler: function (val, oldVal) {
        this.lastEdit = getTimestamp()
        let bx = cloneDeep(val)
        if (bx.length) {
          this.$emit('input', JSON.stringify(bx.map(b => this.stripMeta(b)), null, 2))
        }
        return val
      },
      deep: true
    }
  },

  async created () {
    console.debug('==> VILLAIN EDITOR INITIALIZING')
    if (this.templates) {
      this.availableTemplates = await fetchTemplates(this.templates, this.extraHeaders, `${this.server}${this.templatesURL}`)
    }

    // convert data to blocks
    if (!this.json || this.json === '') {
      this.blocks = []
    } else {
      // check if it needs to be parsed!
      if (typeof (this.json) === 'object') {
        this.blocks = cloneDeep(this.json)
      } else {
        this.blocks = JSON.parse(this.json)
      }
      this.blocks = this.addUIDs()
    }

    this.lastEdit = getTimestamp()

    // setup autosave interval
    setInterval(() => {
      // Only autosave if there are changes
      if (this.lastEdit > this.lastAutosavedAt) {
        this.lastAutosavedAt = getTimestamp()
        this.autosaveStatus = 'autolagrer...'
        setTimeout(() => {
          this.autosaveStatus = ''
        }, 2500)
        addAutoSave(this.blocks)
      }
    }, AUTOSAVE_INTERVAL)
  },

  mounted () {
    this.animateIn()
  },

  methods: {
    toggleAutosaves () {
      if (this.showAutosaves) {
        this.showAutosaves = false
        return
      }
      this.autosaveEntries = getAutoSaves()
      this.showAutosaves = true
    },

    restoreAutosave (a) {
      console.log(a)
      alertConfirm('OBS!', 'Du er i ferd med å erstatte innholdet med data fra en autolagret versjon. Er du sikker på at du vil fortsette?', data => {
        if (data) {
          this.blocks = a.content
          this.showAutosaves = false
        }
      })
    },

    animateIn (speed = 1) {
      TweenMax.fromTo(this.$el, speed, { opacity: 0 }, { opacity: 1 })
      TweenMax.fromTo(this.$el.querySelector('.villain-editor-instructions'), speed, { x: -5, opacity: 0 }, { x: 0, opacity: 1, delay: 0.9 })
      TweenMax.fromTo(this.$el.querySelector('.villain-editor-controls'), speed, { x: -5, opacity: 0 }, { x: 0, opacity: 1, delay: 0.5 })
      TweenMax.staggerFromTo(this.$el.querySelectorAll('.villain-editor-controls > div'), speed, { x: -3, opacity: 0 }, { x: 0, opacity: 1, delay: 1.2 }, 0.1)
    },

    async updateTemplates () {
      this.availableTemplates = await fetchTemplates(this.templates, this.extraHeaders, `${this.server}${this.templatesURL}`)
    },

    updateSource () {
      this.blocks = JSON.parse(this.updatedSource)
      this.blocks = this.addUIDs()
      this.toggleSource()
    },

    toggleSource () {
      if (this.showSource) {
        this.showSource = false
      } else {
        let bx = cloneDeep(this.blocks)
        this.updatedSource = JSON.stringify(bx.map(b => this.stripMeta(b)), null, 2)
        this.showSource = true
        autosize(this.$refs.tasource)
      }
    },

    refresh () {
      let bx = cloneDeep(this.blocks)
      this.updatedSource = JSON.stringify(bx.map(b => this.stripMeta(b)), null, 2)
      this.blocks = JSON.parse(this.updatedSource)
      this.blocks = this.addUIDs()

      this.animateIn(0.5)
    },

    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
    },

    addUIDs () {
      return [...this.blocks].map(b => {
        return { ...b, uid: this.createUID() }
      })
    },

    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    /*
    ** Strip out uid and locked properties
    **/
    stripMeta (obj) {
      if (!obj) {
        return obj
      }

      if (obj.hasOwnProperty('uid')) {
        delete obj.uid
      }

      if (obj.hasOwnProperty('locked')) {
        delete obj.locked
      }

      return obj
    },

    addBlock ({ block: blockTpl, after, parent }) {
      let block
      // a standard component blueprint
      if (blockTpl.hasOwnProperty('component')) {
        if (blockTpl.component === 'Columns' || blockTpl.component === 'Timeline' || blockTpl.component === 'Datatable') {
          block = {
            type: blockTpl.component.toLowerCase(),
            data: [ ...blockTpl.dataTemplate ],
            uid: blockTpl.uid
          }
        } else {
          block = {
            type: blockTpl.component.toLowerCase(),
            data: { ...blockTpl.dataTemplate },
            uid: blockTpl.uid
          }
        }
      } else {
        // a template block
        block = cloneDeep(blockTpl)
      }

      // no after, no parent = + at the top OR first one if empty
      if (!after && !parent) {
        // if we have blocks, it's the top + so we add to top
        if (this.blocks.length) {
          this.blocks = [
            block,
            ...this.blocks
          ]
        } else {
          this.blocks = [
            ...this.blocks,
            block
          ]
        }
        return
      }

      if (parent) {
        // child of a column
        let mainBlock = this.blocks.find(b => {
          if (b.type === 'columns') {
            for (let key of Object.keys(b.data)) {
              let x = b.data[key]
              if (x.uid === parent) {
                return x
              }
            }
          }
        })
        let parentBlock = null
        if (mainBlock) {
          // we have the main block -- add to the correct parent
          for (let key of Object.keys(mainBlock.data)) {
            let y = mainBlock.data[key]
            if (y.uid === parent) {
              parentBlock = y
            }
          }

          if (after) {
            let p = parentBlock.data.find(b => b.uid === after)
            if (!p) {
              console.error('--- NO UID FOR "AFTER"-BLOCK')
            }
            let idx = parentBlock.data.indexOf(p)

            if (idx + 1 === parentBlock.data.length) {
              // index is last, just add to list
              parentBlock.data = [
                ...parentBlock.data,
                block
              ]
              return
            }

            // we're adding in the midst of things
            parentBlock.data = [
              ...parentBlock.data.slice(0, idx + 1),
              block,
              ...parentBlock.data.slice(idx + 1)
            ]
          } else {
            parentBlock.data = [
              block,
              ...parentBlock.data
            ]
          }
        }
        return
      }

      if (after) {
        let p = this.blocks.find(b => b.uid === after)
        if (!p) {
          console.error('--- NO UID FOR "AFTER"-BLOCK')
        }
        let idx = this.blocks.indexOf(p)

        if (idx + 1 === this.blocks.length) {
          // index is last, just add to list
          this.blocks = [
            ...this.blocks,
            block
          ]
          return
        }

        // we're adding in the midst of things
        this.blocks = [
          ...this.blocks.slice(0, idx + 1),
          block,
          ...this.blocks.slice(idx + 1)
        ]
      }
    },

    moveBlock ({ block, after, parent }) {
      this.deleteBlock(block)

      if (!after && !parent) {
        // if we have blocks, it's the top + so we add to top
        if (this.blocks.length) {
          this.blocks = [
            block,
            ...this.blocks
          ]
        } else {
          this.blocks = [
            block
          ]
        }
      }

      /*
      ** Block is moved into a column
      */
      if (parent) {
        // child of a column
        let mainBlock = this.blocks.find(b => {
          if (b.type === 'columns') {
            for (let key of Object.keys(b.data)) {
              let x = b.data[key]
              if (x.uid === parent) {
                return x
              }
            }
          }
        })

        let parentBlock = null
        if (mainBlock) {
          // we have the main block -- add to the correct parent
          for (let key of Object.keys(mainBlock.data)) {
            let y = mainBlock.data[key]
            if (y.uid === parent) {
              parentBlock = y
            }
          }

          if (after) {
            let p = parentBlock.data.find(b => b.uid === after)
            if (!p) {
              console.error('--- NO UID FOR "AFTER"-BLOCK')
            }
            let idx = parentBlock.data.indexOf(p)

            if (idx + 1 === parentBlock.data.length) {
              // index is last, just add to list
              parentBlock.data = [
                ...parentBlock.data,
                block
              ]
              return
            }

            // we're adding in the midst of things
            parentBlock.data = [
              ...parentBlock.data.slice(0, idx + 1),
              block,
              ...parentBlock.data.slice(idx + 1)
            ]
          } else {
            parentBlock.data = [
              block,
              ...parentBlock.data
            ]
          }
        }
        return
      }

      /*
      ** Block is moved after another block, but not to a columns object
      */
      if (after) {
        let p = this.blocks.find(b => b.uid === after)
        if (!p) {
          if (this.blocks.length) {
            console.error('--- NO UID FOR "AFTER"-BLOCK')
            this.blocks = [
              ...this.blocks,
              block
            ]
            return
          } else {
            this.blocks = [
              block
            ]
            return
          }
        }
        let parentIdx = this.blocks.indexOf(p)

        if (parentIdx + 1 === this.blocks.length) {
          // index is last, just add to list
          this.blocks = [
            ...this.blocks,
            block
          ]
          return
        }

        // we're adding in the midst of things
        this.blocks = [
          ...this.blocks.slice(0, parentIdx + 1),
          block,
          ...this.blocks.slice(parentIdx + 1)
        ]
      }

      // if template block, we refresh
      if (block.type === 'template') {
        this.refresh()
      }
    },

    deleteBlock ({ uid }) {
      let block = this.blocks.find(b => {
        if (b.type === 'columns') {
          for (let col of b.data) {
            for (let colBlock of col.data) {
              if (colBlock.uid === uid) {
                let colIdx = col.data.indexOf(colBlock)
                col.data = [
                  ...col.data.slice(0, colIdx),
                  ...col.data.slice(colIdx + 1)
                ]
              }
            }
          }
        }
        return b.uid === uid
      })
      if (block) {
        let idx = this.blocks.indexOf(block)
        this.blocks = [
          ...this.blocks.slice(0, idx),
          ...this.blocks.slice(idx + 1)
        ]
      }
    },

    orderBlocks (blocks) {
      this.blocks = [...blocks]
    }
  }

}
</script>
