<template>
  <header
    class="py-5 shadow-md flex justify-start items-center sticky top-0 z-10 bg-white text-purple-900"
  >
    <div class="text-2xl mx-5 cursor-pointer" @click="toggleSideMenu">
      <font-awesome-icon icon="bars" />
    </div>

    <div class="font-bold text-3xl text-left lg:max-w-xs lg:w-full">
      <font-awesome-icon icon="address-book" />
      <h1 class="hidden md:inline">&nbsp;Address Book</h1>
    </div>

    <div class="mx-5 relative flex-1">
      <div class="w-full max-w-2xl">
        <input
          v-model="searchQuery"
          type="search"
          name="search"
          placeholder="Search"
          class="app-bar__search bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 pr-4 pl-10 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500"
          aria-label="Search"
        />
        <div
          class="pointer-events-auto md:pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center"
        >
          <font-awesome-icon icon="search" />
        </div>
      </div>
    </div>

    <app-bar-dropdown class="hidden lg:block" />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import debounce from 'lodash/debounce';
import { mapActions, mapMutations } from 'vuex';
import AppBarDropdown from '@/components/AppBarDropdown.vue';

export default Vue.extend({
  name: 'AppBar',

  components: {
    AppBarDropdown,
  },

  data() {
    return {
      isUserMenuOpen: false,
    };
  },

  computed: {
    searchQuery: {
      get() {
        return this.$store.state.contacts.searchQuery;
      },
      set(value) {
        this.debouncedSearch(value);
      },
    },
  },

  created() {
    this.debouncedSearch = debounce(this.setSearchQuery, 300);
  },

  methods: {
    ...mapActions('app', ['toggleSideMenu']),
    ...mapMutations('contacts', ['setSearchQuery']),
  },
});
</script>

<style lang="scss" scoped>
.app-bar__search {
  transition: all 0.25s;
}

.app-bar__dropdown-menu {
  transition: all 0.25s;
}
</style>
