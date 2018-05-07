<template>
  <Block
    :block="block"
    :parent="block.uid"
    :config="showConfig"
    @add="$emit('add', $event)"
    @delete="$emit('delete', $event)">

    <!-- parse each block inside columns -->
    <div class="row">
      <div
        v-for="col in block.data"
        :class="col.class">
        <div v-if="col.data.length">
          <div class="villain-block-container">
            <div class="villain-block-wrapper">
              <VillainPlus
                :parent="col.uid"
                @add="$emit('add', $event)"
              />
            </div>
          </div>
          <div
            v-for="b in col.data"
            class="villain-block-container"
          >
            <component
              :is="b.type + 'Block'"
              :block="b"
              :parent="col.uid"
              :after="b.uid"
              @add="$emit('add', $event)"
              @delete="$emit('delete', $event)"
            />
          </div>
        </div>
        <div v-else>
          <div class="villain-block-container">
            <div class="villain-block-wrapper">
              <VillainPlus
                :parent="col.uid"
                @add="$emit('add', $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <template slot="config">
      <div class="form-group">
        <label>Antall kolonner</label>
        <input
          v-model="columnCount"
          class="form-control"
          type="input">
        <button
          class="btn btn-primary"
          @click="updateColumns"
        >
          Sett kolonneantall (overskriver nåværende kolonner!)
        </button>
      </div>
    </template>
  </Block>
</template>

<script>
import Block from './Block'
import BlockContainer from './BlockContainer'
import VillainPlus from '../tools/VillainPlus'

import BlockquoteBlock from './BlockquoteBlock'
import ColumnsBlock from './ColumnsBlock'
import DividerBlock from './DividerBlock'
import HeaderBlock from './HeaderBlock'
import ImageBlock from './ImageBlock'
import MapBlock from './MapBlock'
import MarkdownBlock from './MarkdownBlock'
import TextBlock from './TextBlock'
import VideoBlock from './VideoBlock'
import TimelineBlock from './TimelineBlock'

export default {
  name: 'columns-block',

  components: {
    Block,
    BlockContainer,
    BlockquoteBlock,
    DividerBlock,
    VillainPlus,
    ColumnsBlock,
    HeaderBlock,
    ImageBlock,
    MapBlock,
    MarkdownBlock,
    TextBlock,
    VideoBlock,
    TimelineBlock
  },

  data () {
    return {
      columnCount: 2,
      showConfig: false,
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
    console.debug('<ColumnsBlock /> created')
    if (!this.block.data.length) {
      this.showConfig = true
    }
  },

  methods: {
    updateColumns () {
      let colClass

      switch (this.columnCount) {
        case 1:
          colClass = 'col-md-12'
          break
        case 2:
          colClass = 'col-md-6'
          break
        case 3:
          colClass = 'col-md-4'
          break
        case 4:
          colClass = 'col-md-3'
          break
      }
    },

    createUID () {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    }
  }
}
</script>
