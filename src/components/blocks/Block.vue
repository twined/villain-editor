<template>
  <div
    v-if="!showConfig"
    class="villain-block">
    <div class="text-small">{{ block.uid }}</div>
    <slot></slot>
    <div class="villain-block-actions">
      <button
        @click="configBlock">
        CONFIG
      </button>
      <button
        @click="deleteBlock">
        DEL
      </button>
    </div>
  </div>

  <div
    v-else
    class="villain-block villain-block-config">
    <slot name="config" />
    <button
      @click="showConfig = false">
      Close
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showConfig: false
    }
  },

  props: {
    block: {
      type: Object,
      default: () => {}
    },

    config: {
      type: Boolean,
      default: false
    }
  },

  created () {
    if (this.config) {
      this.showConfig = true
    }
  },

  methods: {
    configBlock () {
      this.showConfig = true
    },

    deleteBlock () {
      this.$emit('delete', this.block)
    }
  }
}
</script>
