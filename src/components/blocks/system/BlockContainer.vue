<template>
  <div>
    <div
      class="villain-block-wrapper">
      <VillainPlus
        @add="$emit('add', $event)"
        @move="$emit('move', $event)"
      />
    </div>

    <transition-group name="bounce">
      <div
        v-for="b in cBlocks"
        :key="b.uid"
        class="villain-block-container">
        <component
          :is="b.type + 'Block'"
          :block="b"
          @add="$emit('add', $event)"
          @delete="$emit('delete', $event)"
          @move="$emit('move', $event)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: 'block-container',

  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    cBlocks: {
      get: function () {
        return [...this.blocks]
      },
      set: function (blocks) {
        this.$emit('order', blocks)
      }
    }
  },

  data () {
    return {
      uid: null
    }
  },

  created () {
    console.debug('<BlockContainer /> created')
    this.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>
