<template>
  <div>
    <nav :class="{ 'side-menu--visible': isSideMenuOpen }" class="side-menu">
      <div
        class="md:hidden flex flex-col justify-center items-center border-b-2 pb-5 mb-5"
      >
        <span class="font-medium text-gray-900">{{ username }}</span>
        <button class="mx-5 font-bold text-purple-900" @click="logout">
          Logout
        </button>
      </div>

      <div class="flex flex-1 flex-col overflow-auto">
        <create-contact-button class="mx-2 hidden md:block" />

        <a
          :class="{ 'side-menu__group-button--active': !selectedGroupId }"
          class="side-menu__group-button md:mt-5"
          @click="selectGroup(undefined)"
        >
          <font-awesome-icon icon="users" class="mx-2 text-gray-600" />
          <span class="text-gray-900">All contacts</span>
        </a>

        <a
          v-if="networkOnLine"
          class="side-menu__group-button mt-5"
          @click="showCreateGroupModal"
        >
          <font-awesome-icon icon="plus" class="mx-2 text-gray-600" />
          <span class="text-gray-900">Create group</span>
        </a>

        <span class="mt-1 text-gray-900 font-medium">Groups</span>

        <div class="overflow-y-auto flex flex-1 flex-col">
          <a
            v-for="group in groups"
            :key="group.id"
            :class="{
              'side-menu__group-button--active': selectedGroupId === group.id,
            }"
            class="mt-1 p-2 side-menu__group-button"
            @click="selectGroup(group.id)"
          >
            <app-img-loader
              :src="group.pictureUrl"
              :placeholder-src="groupImgPlaceholder"
              alt=""
              class="h-8 w-8 inline mr-2 object-cover rounded-full"
            />
            <span class="text-gray-900">{{ group.name }}</span>
          </a>
        </div>
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
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as groupImgPlaceholder from '@/assets/img/group-default-photo.png';
import CreateContactButton from '@/components/contacts/CreateContactButton.vue';

export default Vue.extend({
  name: 'SideMenu',

  components: { AppImgLoader, CreateContactButton },

  data() {
    return {
      groupImgPlaceholder,
    };
  },

  computed: {
    ...mapState('app', ['networkOnLine', 'isSideMenuOpen']),
    ...mapState('groups', ['selectedGroupId']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('auth', ['username']),
  },

  methods: {
    ...mapActions('app', ['toggleSideMenu']),
    ...mapActions('auth', ['logout']),
    ...mapActions('modals', ['showCreateContactModal', 'showCreateGroupModal']),
    ...mapActions('groups', ['selectGroup']),
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
    height: calc(100vh - 85px);
  }
}

.side-menu__group-button {
  @apply py-2 text-left font-medium rounded cursor-pointer;
  &:hover:not(&--active) {
    @apply bg-gray-200;
  }

  &--active {
    @apply bg-purple-200;
  }
}
</style>
