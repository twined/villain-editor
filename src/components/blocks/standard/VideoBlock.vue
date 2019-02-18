<template>
  <Block
    :block="block"
    :parent="parent"
    :config="showConfig"
    :show-ok="true"
    icon="fa-video"
    @add="$emit('add', $event)"
    @move="$emit('move', $event)"
    @delete="$emit('delete', $event)">
    <div class="villain-block-video">
      <div
        v-if="html"
        class="villain-block-video-content"
        v-html="html"
      />
      <p
        v-else>
        Ingen gyldig video
      </p>
    </div>
    <template slot="config">
      <div
        class="form-group">
        <p>
          Lim inn link til youtube eller vimeo. <br>
          F.eks <strong>http://www.youtube.com/watch?v=jlbunmCbTBA</strong>
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
import Block from '@/components/blocks/system/Block'

const VIMEO_REGEX = /(?:http[s]?:\/\/)?(?:www.)?vimeo.com\/(.+)/
const YOUTUBE_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})\W/

export default {
  name: 'ImageBlock',

  components: {
    Block
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
      url: '',
      html: '',

      providers: {
        vimeo: {
          regex: VIMEO_REGEX,
          html: [
            '<iframe src="{{protocol}}//player.vimeo.com/video/{{remote_id}}?title=0&byline=0" ',
            'width="580" height="320" frameborder="0"></iframe>'
          ].join('\n')
        },
        youtube: {
          regex: YOUTUBE_REGEX,
          html: ['<iframe src="{{protocol}}//www.youtube.com/embed/{{remote_id}}" ',
            'width="580" height="320" frameborder="0" allowfullscreen></iframe>'
          ].join('\n')
        }
      }
    }
  },

  created () {
    console.debug('<VideoBlock /> created')

    if (!this.block.data.remote_id) {
      this.showConfig = true
    } else {
      this.html = this.providers[this.block.data.source].html
        .replace('{{protocol}}', window.location.protocol)
        .replace('{{remote_id}}', this.block.data.remote_id)
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
          this.block.data.remote_id = match[1]
        }
      }

      if (!{}.hasOwnProperty.call(this.providers, this.block.data.source)) {
        return false
      }

      this.html = this.providers[this.block.data.source].html
        .replace('{{protocol}}', window.location.protocol)
        .replace('{{remote_id}}', this.block.data.remote_id)
    }
  }
}
</script>
