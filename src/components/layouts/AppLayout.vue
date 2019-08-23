<template>
  <div>
    <app-bar />

    <side-menu />
    <main
      :class="{ 'app__container--open': isSideMenuOpen }"
      class="app__container"
    >
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import AppBar from '@/components/AppBar.vue';
import SideMenu from '@/components/SideMenu.vue';

export default Vue.extend({
  name: 'AppLayout',

  components: { AppBar, SideMenu },

  computed: mapState('app', ['isSideMenuOpen']),
});
</script>

<style lang="scss" scoped>
.app__container {
  &--open {
    @screen md {
      padding-left: 280px;
    }
  }

  transition: padding 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
