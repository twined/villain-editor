<template>
  <Block
    :block="block"
    @delete="$emit('delete', $event)">
    <textarea
      v-model="block.data.text">
    </textarea>
    <template slot="config">
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="1">
        <label class="form-check-label">
          H1
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="2">
        <label class="form-check-label">
          H2
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="3">
        <label class="form-check-label">
          H3
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="4">
        <label class="form-check-label">
          H4
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="5">
        <label class="form-check-label">
          H5
        </label>
      </div>
      <div class="form-check">
        <input
          v-model="block.data.level"
          class="form-control"
          type="radio"
          value="6">
        <label class="form-check-label">
          H6
        </label>
      </div>

      <div class="form-group">
        <label>CSS klasser</label>
        <input
          v-model="block.data.class"
          class="form-control"
          type="input">
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'

export default {
  name: 'header-block',

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
    }
  },

  created () {
    console.log('<HeaderBlock /> created')
    console.log(this.block)
    this.block.uid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
  }
}
</script>

<style lang="scss">

</style>
