<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
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
      <div
        v-if="!showImages && !block.data.url">
        <div
          class="display-icon">
          <drop
            class="drop"
            @dragover="dragOver = true"
            @dragleave="dragOver = false"
            @drop="handleDrop">
            <i
              v-if="dragOver"
              class="fa fa-fw fa-cloud-upload-alt"></i>
            <template
              v-else>
              <i
                v-if="uploading"
                class="fa fa-fw fa-circle-notch fa-spin"></i>
              <i
                v-else
                class="fa fa-fw fa-image"></i>
            </template>
          </drop>
        </div>
        <p class="text-center">
          <template
            v-if="dragOver">
            Slipp for å laste opp!
          </template>
          <template v-else>
            <template v-if="uploading">
              Laster opp ...
            </template>
            <template v-else>
              Dra bildet du vil laste opp hit &uarr;
            </template>
          </template>
        </p>
      </div>
      <div
        v-if="showImages"
        class="villain-image-library row mt-4">
        <div
          v-for="i in images"
          class="col-4">
          <img
            :src="i.thumb"
            class="img-fluid"
            @click="selectImage(i)"
          />
        </div>
      </div>
      <div
        v-else>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>Kilde</label>
          <input
            v-model="block.data.url"
            class="form-control"
            type="input">
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>Tittel</label>
          <input
            v-model="block.data.title"
            class="form-control"
            type="input">
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>Krediteringer</label>
          <input
            v-model="block.data.credits"
            class="form-control"
            type="input">
        </div>
        <div
          v-if="block.data.sizes"
          class="form-group">
          <label>Størrelse</label>
          <select
            v-model="block.data.url"
            class="form-control"
          >
            <option
              :value="originalUrl">
              orginal
            </option>
            <option
              v-for="(size, key) in block.data.sizes"
              :value="size">
              {{ key }}
            </option>
          </select>
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
            class="btn btn-primary"
            @click="getImages">
            Velg bilde fra bildebibliotek
          </button>
        </div>
      </div>
    </template>
  </Block>
</template>

<script>
import Block from '@/components/blocks/system/Block'
import { Drop } from 'vue-drag-drop'
import { alertError } from '@/utils/alerts'

export default {
  name: 'image-block',

  components: {
    Block,
    Drop
  },

  computed: {
    browseURL () {
      return this.vBrowseURL + this.vImageSeries
    },

    uploadURL () {
      return `${this.vBaseURL}upload/${this.vImageSeries}`
    }
  },

  data () {
    return {
      customClass: '',
      uid: null,
      showConfig: false,
      showImages: false,
      showUpload: false,
      images: [],
      originalUrl: '',
      dragOver: false,
      uploading: false
    }
  },

  inject: [
    'vBaseURL',
    'vBrowseURL',
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
    console.debug('<ImageBlock /> created')

    if (!this.block.data.url) {
      this.showConfig = true
    }
  },

  methods: {
    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    async getImages () {
      let request
      let headers = new Headers()
      headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

      if (this.vExtraHeaders) {
        for (let key of Object.keys(this.vExtraHeaders)) {
          headers.append(key, this.vExtraHeaders[key])
        }
      }

      request = new Request(this.browseURL, { headers })

      try {
        let response = await fetch(request)
        let data = await response.json()
        // data.images
        if (data.images.length) {
          this.images = data.images
          this.showImages = true
        } else {
          alertError('Feil', 'Fant ingen bilder i biblioteket. Last opp et i stedet!')
        }
      } catch (e) {
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
    },

    handleDrop (data, event) {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (files.length > 1) {
        alertError('OBS', 'Du kan kun laste opp et bilde av gangen her. For å laste opp mange i en sleng, bruk "Bilder"-modulen i admin!')
        this.dragOver = false
        return false
      }

      const f = files.item(0)
      this.upload(f)
    },

    async upload (f) {
      let request
      let headers = new Headers()
      headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

      if (this.vExtraHeaders) {
        for (let key of Object.keys(this.vExtraHeaders)) {
          headers.append(key, this.vExtraHeaders[key])
        }
      }

      const formData = new FormData()
      formData.append('image', f)
      formData.append('name', f.name)
      formData.append('uid', this.createUID())

      request = new Request(this.uploadURL, { headers, method: 'post', body: formData })

      try {
        this.dragOver = false
        this.uploading = true
        let response = await fetch(request)
        let data = await response.json()
        if (data.status === 200) {
          this.showImages = false
          this.uploading = false
          this.block.data.sizes = data.image.sizes
          this.block.data.credits = ''
          this.block.data.title = ''
          this.block.data.url = data.image.src
          this.originalUrl = data.image.src

          this.showConfig = false
        } else {
          this.uploading = false
          alertError('Feil', 'Feil ved opplasting :(')
        }
      } catch (e) {
        this.uploading = false
        alertError('Feil', 'Feil ved opplasting :(', e)
      }
    }
  }
}
</script>
