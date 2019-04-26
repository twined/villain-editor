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
    <div class="villain-editor-toolbar">
      <div class="villain-editor-instructions">
        <i class="fa mr-2 fa-info-circle" />
        Trykk på "+" under for å legge til en innholdsblokk
      </div>
      <div class="villain-editor-controls float-right">
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

    // if this is filled, we get templates from the DB
    templateNamespace: {
      type: String,
      default: null
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
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      blocks: [],
      showSource: false,
      fullscreen: false
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
    },

    async availableTemplates () {
      if (this.templateNamespace) {
        let templates = await this.fetchTemplates(this.templateNamespace)
        return templates
      } else {
        return this.templates
      }
    }
  },

  provide () {
    return {
      vBaseURL: this.baseURL,
      vBrowseURL: this.browseURL,
      vSlideshowsURL: this.slideshowsURL,
      vTemplatesURL: this.templatesURL,
      vImageSeries: this.imageSeries,
      vExtraHeaders: this.extraHeaders,
      vAvailableBlocks: this.availableBlocks,
      vAvailableTemplates: this.availableTemplates,
      vTemplateMode: this.templateMode
    }
  },

  watch: {
    blocks: {
      handler: function (val, oldVal) {
        let bx = cloneDeep(val)
        if (bx.length) {
          this.$emit('input', JSON.stringify(bx.map(b => this.stripMeta(b)), null, 2))
        }
        return val
      },
      deep: true
    }
  },

  created () {
    console.debug('==> VILLAIN EDITOR INITIALIZING')
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
  },

  methods: {
    async fetchTemplates (namespace) {
      let request
      let headers = new Headers()
      headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

      if (this.vExtraHeaders) {
        for (let key of Object.keys(this.vExtraHeaders)) {
          headers.append(key, this.vExtraHeaders[key])
        }
      }

      request = new Request(`${this.templatesURL}/${namespace || 'all'}`, { headers })

      try {
        let response = await fetch(request)
        let data = await response.json()

        console.log('==> fetchTemplates')
        console.log(data)
        return data
      } catch (e) {
        alertError('Feil', 'Klarte ikke hente maler fra databasen!')
        console.error(e)
      }
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
