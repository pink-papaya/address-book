<template>
  <div>
    <nav :class="{ 'side-menu--visible': isSideMenuOpen }" class="side-menu">
      <div
        class="md:hidden flex flex-col justify-center items-center border-b-2 pb-5 mb-5"
      >
        <span class="font-medium text-gray-900">Username</span>
        <button class="mx-5 font-bold text-purple-900" @click="logout">
          Logout
        </button>
      </div>

      <div class="flex flex-1 flex-col">
        <button
          type="button"
          class="border-2 border-purple-900 mx-2 text-purple-900 hover:bg-purple-900 hover:text-white p-2 font-medium hidden md:block rounded"
          @click="showCreateContactModal"
        >
          <font-awesome-icon icon="plus" class="mx-2" />
          Create contact
        </button>

        <button
          :class="{ 'bg-purple-100': !activeGroup }"
          type="button"
          class="md:mt-5 py-2 text-left hover:bg-purple-100 font-medium rounded"
          @click="setGroup(null)"
        >
          <font-awesome-icon icon="users" class="mx-2 text-gray-600" />
          <span class="text-gray-900">All contacts</span>
        </button>

        <span class="mt-5 text-gray-900 font-medium">Groups</span>

        <button
          v-for="group in groups"
          :key="group.id"
          type="button"
          class="my-2 p-2 text-left hover:bg-purple-100 font-medium rounded"
          @click="setGroup(group.id)"
        >
          <img
            :src="group.pictureUrl"
            :alt="group.name"
            class="h-8 w-8 inline mr-2 object-cover rounded-full"
          />
          <span class="text-gray-900">{{ group.name }}</span>
        </button>
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
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'SideMenu',

  computed: {
    ...mapState('app', ['isSideMenuOpen']),
    ...mapGetters('groups', ['groups']),
    activeGroup() {
      return null;
    },
  },

  methods: {
    ...mapActions('app', ['toggleSideMenu']),
    ...mapActions('auth', ['logout']),
    ...mapActions('modals', ['showCreateContactModal']),
    setGroup(id: string) {},
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
