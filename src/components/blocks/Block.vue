<template>
  <div
    class="villain-block-wrapper">
    <div
      v-show="!showConfig"
      class="villain-block">
      <slot></slot>
      <div class="villain-block-actions">
        <div class="villain-block-action villain-move">
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
      :after="block.uid"
      :parent="parent"
      @add="$emit('add', $event)"
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
      showConfig: false
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
