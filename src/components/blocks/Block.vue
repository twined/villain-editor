<template>
  <div
    ref="wrapper"
    class="villain-block-wrapper">
    <div
      v-show="!showConfig"
      :class="hovering ? 'villain-hover' : ''"
      ref="content"
      class="villain-block"
      :data-type="block.type">
      <slot></slot>
      <div class="villain-block-actions">
        <div
          ref="handle"
          class="villain-block-action villain-move">
          <i class="fa fa-fw fa-expand-arrows-alt" />
        </div>
        <div
          v-if="hasConfigSlot"
          class="villain-block-action villain-config"
          @click="configBlock">
          <i class="fa fa-fw fa-cog" />
        </div>
        <div
          class="villain-block-action villain-delete"
          @click="deleteBlock">
          <i class="fa fa-fw fa-trash-alt" />
        </div>
      </div>
    </div>

    <div
      v-show="showConfig"
      ref="config"
      class="villain-block villain-block-config">
      <div class="villain-block-config-content">
        <h5>Blokkoppsett &rarr;</h5>

        <div
          v-if="icon"
          class="display-icon">
          <i
            :class="icon"
            class="fa fa-fw" />
        </div>

        <slot name="config" />

        <div class="villain-config-content-buttons">
          <button
            class="btn btn-primary mt-3"
            @click="showConfig = false">
            Lukk
          </button>
        </div>

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
            class="villain-block-action villain-delete"
            @click="deleteBlock">
            <i class="fa fa-fw fa-trash-alt" />
          </div>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import VillainPlus from '@/components/tools/VillainPlus'

export default {
  components: {
    VillainPlus
  },

  data () {
    return {
      showConfig: false,
      dragEl: null,
      hovering: false,
      moving: false
    }
  },

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

  computed: {
    hasConfigSlot () {
      return this.$slots.hasOwnProperty('config')
    }
  },

  watch: {
    config (v) {
      this.showConfig = v
    }
  },

  created () {
    if (this.config) {
      this.showConfig = true
    }
  },

  mounted () {
    this.$refs.content.addEventListener('mouseover', this.onMouseOver)
    this.$refs.content.addEventListener('mouseleave', this.onMouseLeave)
    this.$refs.content.addEventListener('dragstart', this.onDragStart)
    this.$refs.content.addEventListener('dragend', this.onDragEnd)
    this.$refs.handle.addEventListener('mousedown', this.onMouseDown)
  },

  methods: {
    configBlock () {
      this.showConfig = true
    },

    deleteBlock () {
      this.$emit('delete', this.block)
    },

    onDragStart (ev) {
      ev.stopPropagation()

      let data = this.block
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
        this.$refs.content.setAttribute('draggable', 'false')
      }

      this.dragEl.parentNode.removeChild(this.dragEl)
    },

    onMouseDown (ev) {
      this.$refs.content.setAttribute('draggable', 'true')
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
