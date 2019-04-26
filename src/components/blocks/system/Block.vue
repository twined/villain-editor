<template>
  <div
    ref="wrapper"
    class="villain-block-wrapper">
    <div
      v-show="!showConfig"
      ref="content"
      :class="hovering ? 'villain-hover' : ''"
      :data-type="block.type"
      class="villain-block">
      <slot></slot>
      <div class="villain-block-actions">
        <div
          v-if="!locked"
          ref="handle"
          class="villain-block-action villain-move">
          <i class="fa fa-fw fa-arrows-alt" />
        </div>
        <div
          v-if="locked"
          ref="handle"
          class="villain-block-action villain-locked">
          <i class="fa fa-fw fa-lock" />
        </div>
        <div
          v-if="hasHelpSlot"
          class="villain-block-action villain-help"
          @click="helpBlock">
          <i class="fa fa-fw fa-question-circle" />
        </div>
        <div
          v-if="hasConfigSlot"
          class="villain-block-action villain-config"
          @click="configBlock">
          <i class="fa fa-fw fa-cog" />
        </div>
        <div
          v-if="!locked"
          class="villain-block-action villain-delete"
          @click="deleteBlock">
          <i class="fa fa-fw fa-trash-alt" />
        </div>
        <div
          v-if="locked"
          class="villain-block-action villain-locked">
          <i class="fa fa-fw fa-lock" />
        </div>
      </div>
      <div class="villain-block-info">
        {{ getBlockDisplayName(block.type) }}
      </div>
    </div>

    <div
      v-show="showHelp"
      ref="help"
      class="villain-block villain-block-help">
      <div class="villain-block-help-content">
        <h5>Hjelpetekst &rarr;</h5>

        <div
          v-if="icon"
          class="display-icon">
          <i
            :class="icon"
            class="fa fa-fw" />
        </div>

        <slot name="help" />

        <div class="villain-help-content-buttons">
          <button
            class="btn btn-primary mt-3"
            @click="showHelp = false">
            Lukk
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="showConfig"
      ref="config"
      class="villain-block villain-block-config">
      <div class="villain-block-config-content">
        <div class="villain-config-close-button">
          <i
            class="fa fa-times"
            @click="showConfig = false" />
        </div>

        <h5>Konfigurasjon &mdash; {{ getBlockDisplayName(block.type) }}</h5>

        <div
          v-if="icon"
          class="display-icon">
          <i
            :class="icon"
            class="fa fa-fw" />
        </div>

        <slot name="config" />

        <div class="villain-block-actions">
          <div class="villain-block-action villain-move">
            <i class="fa fa-fw fa-expand-arrows-alt" />
          </div>
          <div
            v-if="hasConfigSlot"
            class="villain-block-action villain-config"
            @click="showConfig = false">
            <i class="fa fa-fw fa-cog" />
          </div>
          <div
            v-if="!locked"
            class="villain-block-action villain-delete"
            @click="deleteBlock">
            <i class="fa fa-fw fa-trash-alt" />
          </div>
          <div
            v-if="locked"
            class="villain-block-action villain-locked">
            <i class="fa fa-fw fa-lock" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="!locked">
      <VillainPlus
        v-if="block.type !== 'columns'"
        :after="block.uid"
        :parent="parent"
        @add="$emit('add', $event)"
        @move="$emit('move', $event)"
      />
      <VillainPlus
        v-else
        :after="block.uid"
        @add="$emit('add', $event)"
        @move="$emit('move', $event)"
      />
    </template>
  </div>
</template>

<script>
export default {

  props: {
    block: {
      type: Object,
      default: () => {}
    },

    parent: {
      type: String,
      default: null
    },

    config: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: ''
    },

    showOk: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showConfig: false,
      showHelp: false,
      dragEl: null,
      hovering: false,
      moving: false
    }
  },

  computed: {
    hasConfigSlot () {
      return this.$slots.hasOwnProperty('config')
    },

    hasHelpSlot () {
      return this.$slots.hasOwnProperty('help')
    },

    locked () {
      return this.block.hasOwnProperty('locked') && this.block.locked
    }
  },

  watch: {
    config (v) {
      this.showConfig = v
    },

    help (v) {
      this.showHelp = v
    }
  },

  inject: [
    'available'
  ],

  created () {
    if (this.config) {
      this.showConfig = true
    }
  },

  mounted () {
    this.$refs.content.addEventListener('mouseover', this.onMouseOver)
    this.$refs.content.addEventListener('mouseleave', this.onMouseLeave)
    this.$refs.handle.addEventListener('dragstart', this.onDragStart)
    this.$refs.handle.addEventListener('dragend', this.onDragEnd)
    this.$refs.handle.addEventListener('mousedown', this.onMouseDown)

    setTimeout(() => {
      let elTop = this.$el.getBoundingClientRect().top
      let docBot = document.body.scrollTop + window.innerHeight
      let elHeight = this.$el.clientHeight
      let elBot = elTop + elHeight

      if (elBot > docBot) {
        let distance = elBot - docBot
        window.scrollBy({
          top: distance,
          behavior: 'smooth'
        })
      }
    }, 250)
  },

  methods: {
    getBlockDisplayName (blkType) {
      let foundBlock = this.available.blocks.find(b => {
        return b.component.toLowerCase() === blkType
      })
      if (foundBlock) {
        return foundBlock.name
      }
      return ''
    },

    helpBlock () {
      this.showHelp = true
    },

    configBlock () {
      this.showConfig = true
    },

    deleteBlock () {
      this.$emit('delete', this.block)
    },

    onDragStart (ev) {
      ev.stopPropagation()

      let data = this.block
      console.log('data', data)
      let block = this.$refs.content
      let handle = this.$refs.handle
      let hCR = handle.getBoundingClientRect()

      this.dragEl = block.cloneNode(true)
      this.dragEl.classList.add('villain-drag-element')

      this.dragEl.style.top = `${block.offsetTop}px`
      this.dragEl.style.left = `${block.offsetLeft}px`

      block.parentNode.appendChild(this.dragEl)

      ev.dataTransfer.dropEffect = 'move'
      ev.dataTransfer.setDragImage(this.dragEl, hCR.left, 1)
      ev.dataTransfer.setData('application/villain', JSON.stringify(data, null, 2))

      this.$refs.content.classList.add('villain-dragging-block')
    },

    onDragEnd (ev) {
      ev.stopPropagation()

      if (this.$refs.content) {
        // might be removed when recreated in another column
        this.$refs.content.classList.remove('villain-dragging-block')
        this.$refs.handle.setAttribute('draggable', 'false')
      }

      this.dragEl.parentNode.removeChild(this.dragEl)
    },

    onMouseDown (ev) {
      this.$refs.handle.setAttribute('draggable', 'true')
    },

    onMouseOver (ev) {
      ev.stopPropagation()
      this.hovering = true
    },

    onMouseLeave (ev) {
      ev.stopPropagation()
      this.hovering = false
    }
  }
}
</script>
