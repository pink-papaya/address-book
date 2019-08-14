<template>
  <div>
    <nav :class="{ 'side-menu--visible': isSideMenuOpen }" class="side-menu">
      <div
        class="md:hidden flex flex-col justify-center items-center border-b-2 pb-5"
      >
        <span class="font-medium text-gray-900">Username</span>
        <button class="mx-5 font-bold text-purple-900" @click="logout">
          Logout
        </button>
      </div>
      <div class="flex flex-1 flex-col">
        Groups
      </div>
    </nav>
    <div
      v-show="isSideMenuOpen"
      class="fixed md:hidden inset-0 z-20"
      @click="toggleSideMenu"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'SideMenu',

  computed: mapState('app', ['isSideMenuOpen']),

  methods: {
    ...mapActions('app', ['toggleSideMenu']),
    ...mapActions('auth', ['logout']),
  },
});
</script>

<style lang="scss" scoped>
.side-menu {
  @apply bg-white flex flex-col fixed top-0 z-30 p-5;
  height: 100vh;
  width: 280px;
  transform: translateX(-100%);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &--visible {
    @apply shadow-2xl;
    transform: translateX(0);
  }

  @screen md {
    @apply shadow-none z-0;
    margin-top: 85px;
  }
}
</style>
