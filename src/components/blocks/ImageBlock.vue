<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    icon="fa-image"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-image">
      <img
        v-if="block.data.url"
        :src="block.data.url"
        class="img-fluid">
      <p
        v-else>
        Inget gyldig bilde
      </p>
    </div>
    <template slot="config">
      <div class="form-group">
        <label>Kilde</label>
        <input
          v-model="block.data.url"
          class="form-control"
          type="input">
      </div>

      <div
        v-if="block.data.sizes"
        class="form-group">
        <label>Størrelse</label>
        -- legg inn array av str her som oppdaterer block.data.url?
      </div>

      <div
        v-if="block.data.url"
        class="form-group">
        <label>CSS klasser</label>
        <input
          v-model="block.data.class"
          class="form-control"
          type="input">
      </div>
      <div class="villain-config-content-buttons">
        <button
          @click="getImages"
          class="btn btn-primary">
          Hent bilde fra bildebibliotek
        </button>

        <button class="btn btn-primary">
          Last opp nye bilder
        </button>
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'

export default {
  name: 'image-block',

  components: {
    Block
  },

  computed: {
    url () {
      return this.browseURL
    }
  },

  data () {
    return {
      customClass: '',
      uid: null,
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
    }
  },

  created () {
    console.debug('<ImageBlock /> created')

    if (!this.block.data.url) {
      this.showConfig = true
    }
  },

  methods: {
    async getImages () {
      try {
        var response = await fetch(this.url)
        var data = await response.json()
        console.log(data)
      } catch (e) {
        console.log('Booo')
      }
    }
  }
}
</script>
