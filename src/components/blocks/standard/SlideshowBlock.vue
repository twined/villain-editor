<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div
      ref="block"
      class="villain-block-slideshow">
      <transition-group
        v-sortable="{handle: '.villain-block-slideshow-image', animation: 500, store: {get: getOrder, set: storeOrder}}"
        v-if="block.data.images.length"
        name="fade-move"
        tag="div"
        class="villain-block-slideshow-images">
        <div
          v-for="i in block.data.images"
          :key="i.url"
          :data-id="i.url"
          class="villain-block-slideshow-image"
          @mouseover="imgHover"
          @mouseout="imgLeave"
          @click="toggleImage(i)">
          <div
            v-if="toggledImageUrl === i.url"
            class="villain-block-slideshow-image-overlay">
            <i
              class="fa fa-info-circle"
              @click.prevent.stop="edit(i)"
            />
            <i
              class="fa fa-trash"
              @click="del(i)"
            />
          </div>
          <img
            :src="i.sizes.thumb"
            class="img-fluid">
        </div>
      </transition-group>
      <div
        v-else
        class="d-flex justify-content-center">
        <div class="d-inline-block">
          Ingen bilder i karusellen
        </div>
      </div>
      <div
        v-if="editImage"
        key="editImageKey"
        class="villain-block-slideshow-images-meta">
        <label>Tittel/bildetekst</label>
        <input
          v-model="editImage.title"
          class="form-control"
          type="input">
        <div class="d-flex justify-content-center mt-3">
          <button
            class="btn btn-primary"
            @click="editImage = null; toggledImageUrl = null">
            Lukk
          </button>
        </div>

      </div>
    </div>

    <template slot="config">
      <div
        v-if="showUpload">
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
              Dra bildene du vil laste opp hit &uarr;
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
            :key="i.id">
            <td class="fit">
              <img
                :src="i.thumb"
                :class="alreadySelected(i) ? 'villain-image-table-selected' : ''"
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
        class="villain-image-library row mt-4 justify-content-center">
        <div
          class="col-12"
          style="text-align: center;padding-bottom: 20px;"
          @click="listStyle = true">
          <i class="fa fa-fw fa-list" />
        </div>
        <div class="col-12 d-flex justify-content-center mb-4">
          <button
            class="btn btn-primary mx-auto"
            @click="showUpload = true; showImages = false">
            Last opp bilder
          </button>
        </div>
        <div
          v-for="i in images"
          :key="i.id"
          class="col-3 mb-3">
          <img
            :src="i.thumb"
            :class="alreadySelected(i) ? 'villain-image-table-selected' : ''"
            class="img-fluid"
            @click="selectImage(i)"
          />
        </div>
      </div>

      <div class="villain-config-content-buttons">
        <button
          v-if="!showImages"
          class="btn btn-primary"
          @click="showImages = true; showUpload = false">
          Velg bilder fra bildebibliotek
        </button>
      </div>
    </template>
    <template slot="help">
      <p>
        For å slette et bilde i bildekarusellen, klikker du på bildet, deretter klikker du på søplekasse-ikonet (<i class="fa fa-trash" />)<br><br>
        For å gi bildene bildetekst, klikker du på bildet og deretter på info-ikonet (<i class="fa fa-info-circle" />)<br><br>
        For å sortere bildene kan du dra og slippe de i ønsket rekkefølge
      </p>
    </template>
  </Block>
</template>

<script>
import Block from '@/components/blocks/system/Block'
import { Drop } from 'vue-drag-drop'
import { alertError } from '@/utils/alerts'

export default {
  name: 'SlideshowBlock',

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
      uid: null,
      showConfig: false,
      showImages: true,
      showUpload: false,
      dragOver: false,
      uploading: false,
      images: [],
      listStyle: false,
      toggledImageUrl: null,
      editImage: null
    }
  },

  computed: {
    browseURL () {
      return this.vBrowseURL + this.vImageSeries
    },

    uploadURL () {
      return `${this.vBaseURL}upload/${this.vImageSeries}`
    }
  },

  inject: [
    'vBaseURL',
    'vBrowseURL',
    'vImageSeries',
    'vExtraHeaders'
  ],

  created () {
    console.debug('<SlideshowBlock /> created')

    this.getImages()

    if (!this.block.data.images.length) {
      this.showConfig = true
      this.showImages = false
      this.showUpload = true
    } else {

    }
  },

  methods: {
    edit (img) {
      this.editImage = img
    },

    toggleImage (img) {
      if (this.toggledImageUrl === img.url) {
        this.toggledImageUrl = null
        return
      }
      this.toggledImageUrl = img.url
    },

    del (img) {
      let i = this.block.data.images.find(i => i.url === img.url)
      if (i) {
        let idx = this.block.data.images.indexOf(i)
        this.block.data.images = [
          ...this.block.data.images.slice(0, idx),
          ...this.block.data.images.slice(idx + 1)
        ]
      }
    },

    alreadySelected (img) {
      if (this.block.data.images.find(i => i.url === img.src)) {
        return true
      }
      return false
    },

    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    },

    getOrder (sortable) {
      return this.block.data.images
    },

    storeOrder (sortable) {
      this.sortedArray = sortable.toArray()
      let newImages = []
      this.sortedArray.forEach(x => {
        let i = this.block.data.images.find(i => i.url === x)
        newImages = [
          ...newImages,
          i
        ]
      })
      this.block.data.images = newImages
    },

    imgHover (e) {
      e.currentTarget.classList.add('hover')
    },

    imgLeave (e) {
      e.currentTarget.classList.remove('hover')
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

        if (data.images.length) {
          this.images = data.images
        } else {
          this.images = []
        }
      } catch (e) {
        alertError('Feil', 'Klarte ikke koble til bildebiblioteket!')
        console.error(e)
      }
    },

    async handleDrop (data, event) {
      event.preventDefault()
      const files = event.dataTransfer.files

      if (files) {
        for (let i = 0; i < files.length; i++) {
          try {
            await this.upload(files.item(i))
          } catch (e) {
            alertError('Feil', 'Feil ved opplasting :(')
            break
          }
        }
      }

      this.showImages = false
      this.uploading = false
      this.showConfig = false
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
          this.block.data.images = [
            ...this.block.data.images,
            {
              sizes: data.image.sizes,
              credits: '',
              title: '',
              url: data.image.src,
              width: data.image.width,
              height: data.image.height
            }
          ]
        } else {
          this.uploading = false
          alertError('Feil', `Feil ved opplasting :(\n\n${data.error}'`)
        }
      } catch (e) {
        this.uploading = false
        throw (e)
      }
    },

    selectImage (img) {
      if (this.alreadySelected(img)) {
        return
      }

      this.$set(this.block.data, 'images', [
        ...this.block.data.images,
        {
          sizes: img.sizes,
          credits: img.credits,
          title: img.title,
          url: img.src,
          width: img.width,
          height: img.height
        }
      ])
    }
  }
}
</script>
