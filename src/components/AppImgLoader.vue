<template>
  <img :src="imageSrc" />
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AppImgLoader',

  props: {
    src: {
      type: String,
      default: null,
    },
    placeholderSrc: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isLoaded: false,
      img: null,
    };
  },

  computed: {
    imageSrc() {
      return this.isLoaded ? this.src : this.placeholderSrc;
    },
  },

  created() {
    this.isLoaded = false;

    if (this.src) {
      this.createLoader();
    }
  },

  methods: {
    createLoader() {
      this.destroyLoader();
      this.img = new Image();

      this.img.onload = this.handleLoad;
      this.img.onerror = this.handleError;
      this.img.src = this.src;
    },
    destroyLoader() {
      if (this.img) {
        this.img.onload = null;
        this.img.onerror = null;
        this.img = null;
      }
    },
    handleLoad() {
      this.isLoaded = true;
      this.destroyLoader();
      this.$emit('onLoad');
    },
    handleError(error) {
      this.destroyLoader();
      this.$emit('onError', error);
    },
  },
});
</script>
