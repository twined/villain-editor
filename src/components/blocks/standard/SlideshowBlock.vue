<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-slideshow">
      {{ block.data }}
    </div>
    <template slot="config">
      <div
        v-if="block.data.sizes && series.length"
        class="form-group">
        <label>Bildeserie</label>
        <select
          v-model="block.data.imageseries"
          class="form-control"
        >
          <option
            v-for="(s, idx) in series"
            :key="idx"
            :value="s">
            {{ s }}
          </option>
        </select>
      </div>
      <div class="villain-config-content-buttons">
        <button
          class="btn btn-primary"
          @click="getImageSeries">
          Hent tilgjengelige bildekaruseller fra server
        </button>
      </div>
    </template>
  </Block>
</template>

<script>
import Block from '@/components/blocks/system/Block'
import { alertError } from '@/utils/alerts'

export default {
  name: 'slideshow-block',

  components: {
    Block
  },

  computed: {
    slideshowsURL () {
      return this.vSlideshowsURL
    }
  },

  data () {
    return {
      uid: null,
      showConfig: false,
      series: []
    }
  },

  inject: [
    'vBaseURL',
    'vSlideshowsURL',
    'vImageSeries',
    'vExtraHeaders'
  ],

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
    console.debug('<SlideshowBlock /> created')

    if (!this.block.data.imageseries) {
      this.showConfig = true
    }
  },

  methods: {
    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    async getImageSeries () {
      let request
      let headers = new Headers()
      headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

      if (this.vExtraHeaders) {
        for (let key of Object.keys(this.vExtraHeaders)) {
          headers.append(key, this.vExtraHeaders[key])
        }
      }

      request = new Request(this.slideshowsURL, { headers })

      try {
        let response = await fetch(request)
        let data = await response.json()
        console.log(data)
        // data.images
        if (data.series.length) {
          this.series = data.series
        } else {
          alertError('Feil', 'Fant ingen slideshows. Gå til bildeadministrasjonen og last opp!')
        }
      } catch (e) {
        alertError('Feil', 'Kunne ikke koble opp til bildeserver')
        console.log(e)
      }
    },

    selectImage (img) {
      this.showImages = false
      this.$set(this.block.data, 'sizes', img.sizes)
      this.$set(this.block.data, 'credits', img.credits)
      this.$set(this.block.data, 'title', img.title)
      this.$set(this.block.data, 'url', img.src)
      this.originalUrl = img.src

      this.showConfig = false
    }
  }
}
</script>
