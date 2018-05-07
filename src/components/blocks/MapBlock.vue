<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    icon="fa-compass"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-video">
      <div
        v-if="html"
        v-html="html"
        class="villain-block-video-content"
      />
      <p
        v-else>
        Inget gyldig kart
      </p>
    </div>
    <template slot="config">
      <div
        class="form-group">
        <p>
          Lim inn embed-link fra Google Maps
        </p>
        <input
          v-model="url"
          class="form-control"
          type="input"
          @input="parseUrl">
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

  data () {
    return {
      customClass: '',
      uid: null,
      showConfig: false,
      url: '',
      html: '',
      providers: {
        gmaps: {
          regex: /<iframe(?:.*)src="(.*?)"/,
          html: `
            <iframe src="{{protocol}}{{embed_url}}"
                    width="600"
                    height="450"
                    frameborder="0"
                    style="border:0"
                    allowfullscreen></iframe>`
        }
      }
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
    console.debug('<MapBlock /> created')

    if (!this.block.data.embed_url) {
      this.showConfig = true
    } else {
      this.populateMap()
    }
  },

  methods: {
    parseUrl (v) {
      let match
      let url = v.srcElement.value

      for (let key of Object.keys(this.providers)) {
        let provider = this.providers[key]
        match = provider.regex.exec(url)

        if (match !== null && match[1] !== undefined) {
          this.block.data.source = key
          this.block.data.embed_url = match[1].replace('http:', '').replace('https:', '')
        }
      }

      this.populateMap()
    },

    populateMap () {
      if (!{}.hasOwnProperty.call(this.providers, this.block.data.source)) {
        return false
      }

      this.html = this.providers[this.block.data.source].html
        .replace('{{protocol}}', window.location.protocol)
        .replace('{{embed_url}}', this.block.data.embed_url)
    }
  }
}
</script>
