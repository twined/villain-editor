<template>
  <Block
    :block="block"
    :parent="parent"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <textarea
      v-model="block.data.text">
    </textarea>
    <template slot="config">
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-control"
          type="radio"
          value="paragraph">
        <label class="form-check-label">
          Paragraf/brødtekst
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-control"
          type="radio"
          value="lead">
        <label class="form-check-label">
          Ingress
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.type"
          class="form-control"
          type="radio"
          :value="customClass">
        <label class="form-check-label">
          <div class="form-group">
            <input
              v-model="customClass"
              class="form-control"
              type="input">
          </div>
        </label>
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'

export default {
  name: 'text-block',

  components: {
    Block
  },

  data () {
    return {
      customClass: '',
      uid: null
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
    }
  },

  created () {
    console.log('<TextBlock /> created')
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>

<style lang="scss">

</style>
