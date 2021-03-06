<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-description">
      Bildefigur
    </div>
    <div class="villain-block-picture">
      <img
        v-if="block.data.url"
        :src="block.data.url"
        class="img-fluid">
      <div
        v-else
        class="d-flex justify-content-center">
        <div class="d-inline-block">
          Inget bilde
        </div>
      </div>
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
            <template v-if="dragOver">
              <i class="fa fa-fw fa-cloud-upload-alt"></i>
            </template>
            <template
              v-else>
              <template v-if="uploading">
                <i class="fa fa-fw fa-circle-notch fa-spin"></i>
              </template>
              <template v-else>
                <i class="fa fa-fw fa-image"></i>
              </template>
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
        v-if="showImages && listStyle"
        class="villain-image-library mt-4">
        <div
          style="text-align: center;padding-bottom: 20px;"
          @click="listStyle = false">
          <i class="fa fa-fw fa-th" />
        </div>
        <table
          class="table villain-image-table">
          <tr
            v-for="i in images"
            :key="i.id"
          >
            <td class="fit">
              <img
                :src="i.thumb"
                class="img-fluid"
                @click="selectImage(i)"
              />
            </td>
            <td>
              <table class="table table-bordered">
                <tr>
                  <td>
                    <span class="text-mono">{{ i.src.substring(i.src.lastIndexOf('/')+1) }}</span>
                  </td>
                  <td>
                    <span class="text-mono text-align-right">
                      {{ i.width }}x{{ i.height }}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <div
        v-else-if="showImages && !listStyle"
        class="villain-image-library row mt-4">
        <div
          class="col-12"
          style="text-align: center;padding-bottom: 20px;"
          @click="listStyle = true">
          <i class="fa fa-fw fa-list" />
        </div>
        <div
          v-for="i in images"
          :key="i.id"
          class="col-3 mb-3">
          <img
            :src="i.thumb"
            class="img-fluid"
            @click="selectImage(i)"
          />
        </div>
      </div>

      <div v-else>
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
          v-if="block.data.url && block.data.sizes"
          class="form-group">
          <label>Størrelse</label>
          <select
            v-model="block.data.url"
            class="form-control">
            <option
              :value="originalUrl">
              orginal
            </option>
            <option
              v-for="(size, key) in block.data.sizes"
              :key="key"
              :value="size">
              {{ key }}
            </option>
          </select>
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>Media queries</label>
          <textarea
            v-model="block.data.media_queries"
            class="form-control"></textarea>
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>Sourcesets</label>
          <textarea
            v-model="block.data.srcset"
            class="form-control"></textarea>
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>CSS klasser (img)</label>
          <input
            v-model="block.data.img_class"
            class="form-control"
            type="input">
        </div>

        <div
          v-if="block.data.url"
          class="form-group">
          <label>CSS klasser (picture)</label>
          <input
            v-model="block.data.picture_class"
            class="form-control"
            type="input">
        </div>

        <div class="villain-config-content-buttons">
          <button
            v-if="!showImages"
            type="button"
            class="btn btn-primary"
            @click="getImages">
            Velg bilde fra bildebibliotek
          </button>
          <button
            v-if="block.data.url !== ''"
            type="button"
            class="btn btn-primary ml-3"
            @click="resetImage">
            Nullstill bildeblokk
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
  name: 'PictureBlock',

  components: {
    Block,
    Drop
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
      uploading: false,
      listStyle: false
    }
  },

  computed: {
    browseURL () {
      return this.urls.browse + this.block.data.series_slug
    },

    uploadURL () {
      return `${this.urls.base}upload/${this.block.data.series_slug}`
    }
  },

  inject: [
    'urls',
    'headers',
    'available'
  ],

  created () {
    console.debug('<PictureBlock /> created')

    if (!this.block.data.url) {
      this.showConfig = true
    }
  },

  methods: {
    resetImage () {
      this.$set(this.block.data, 'url', '')
      this.$set(this.block.data, 'sizes', {})
      this.$set(this.block.data, 'credits', '')
      this.$set(this.block.data, 'title', '')
      this.$set(this.block.data, 'width', 0)
      this.$set(this.block.data, 'height', 0)
    },

    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    async getImages () {
      let request
      let headers = new Headers()
      headers.append('accept', 'application/json, text/javascript, */*; q=0.01')

      if (this.headers.extra) {
        for (let key of Object.keys(this.headers.extra)) {
          headers.append(key, this.headers.extra[key])
        }
      }

      request = new Request(this.browseURL, { headers })

      try {
        let response = await fetch(request)
        let data = await response.json()

        if (data.images.length) {
          this.images = data.images
          this.showImages = true
        } else {
          alertError('Feil', 'Fant ingen bilder i biblioteket. Last opp et i stedet!')
        }
      } catch (e) {
        alertError('Feil', 'Klarte ikke koble til bildebiblioteket!')
        console.error(e)
      }
    },

    selectImage (img) {
      this.showImages = false

      this.$set(this.block.data, 'url', img.src)
      this.$set(this.block.data, 'sizes', img.sizes)
      this.$set(this.block.data, 'credits', img.credits)
      this.$set(this.block.data, 'title', img.title)
      this.$set(this.block.data, 'width', img.width || 0)
      this.$set(this.block.data, 'height', img.height || 0)

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

      if (this.headers.extra) {
        for (let key of Object.keys(this.headers.extra)) {
          headers.append(key, this.headers.extra[key])
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

          this.$set(this.block.data, 'sizes', data.image.sizes)
          this.$set(this.block.data, 'credits', data.image.credits)
          this.$set(this.block.data, 'title', data.image.title)
          this.$set(this.block.data, 'url', data.image.src)
          this.$set(this.block.data, 'width', data.image.width || 0)
          this.$set(this.block.data, 'height', data.image.height || 0)

          this.originalUrl = data.image.src

          this.showConfig = false
        } else {
          this.uploading = false
          alertError('Feil', `Feil ved opplasting :(\n\n${data.error}'`)
        }
      } catch (e) {
        this.uploading = false
        console.log(' ==> caught error', e)
        alertError('Feil', `Feil ved opplasting :(\n\n${e}`)
      }
    }
  }
}
</script>
