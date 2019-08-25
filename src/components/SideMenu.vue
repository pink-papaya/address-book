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
          @click="setGroup(undefined)"
        >
          <font-awesome-icon icon="users" class="mx-2 text-gray-600" />
          <span class="group-button__label">All contacts</span>
        </a>

        <a
          v-if="networkOnLine"
          class="side-menu__group-button mt-5"
          @click="showGroupModal"
        >
          <font-awesome-icon icon="plus" class="mx-2 text-gray-600" />
          <span class="group-button__label">Create group</span>
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
            @click="setGroup(group.id)"
          >
            <app-img-loader
              :src="group.pictureUrl"
              :placeholder-src="groupImgPlaceholder"
              alt=""
              class="h-8 w-8 mr-2 object-cover rounded-full"
            />
            <span class="group-button__label">{{ group.name }}</span>
            <span class="group-button__actions">
              <font-awesome-icon
                icon="pen"
                class="group-button__action mr-3 fa-sm"
                @click.stop="editGroup(group)"
              />
              <font-awesome-icon
                icon="trash"
                class="group-button__action fa-sm"
                @click.stop="showDeleteConfirmation(group)"
              />
            </span>
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
import { Group } from '@/store/groups/types';

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
    ...mapGetters('contacts', ['contactsByGroupId']),
    ...mapGetters('auth', ['username']),
  },

  methods: {
    ...mapActions('app', ['toggleSideMenu']),
    ...mapActions('auth', ['logout']),
    ...mapActions('modals', ['showGroupModal']),
    ...mapActions('groups', ['selectGroup', 'deleteGroup']),

    setGroup(groupId?: string) {
      this.selectGroup(groupId);

      if (window.innerWidth <= 768 && this.isSideMenuOpen) {
        this.toggleSideMenu();
      }
    },

    editGroup(group: Group) {
      // @ts-ignore
      this.showGroupModal(group);
    },

    async showDeleteConfirmation(group: Group) {
      if (this.contactsByGroupId(group.id).length) {
        this.$dialog.alert({
          title: 'Action not allowed',
          body: 'You must remove all group contacts before removing the group.',
        });

        return;
      }

      try {
        await this.$dialog.confirm(
          'Are you sure you want to delete this group?',
          {
            customClass: 'delete-modal',
            okText: 'Delete',
            cancelText: 'Cancel',
          },
        );

        try {
          // @ts-ignore
          await this.deleteGroup(group);
        } catch (e) {
          console.log(e);
          this.$dialog.alert({
            title: 'Network error',
            body:
              'It was not possible to delete the contact. Please try again later.',
          });
        }
      } catch (e) {
        // ignore cancel
      }
    },
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
  @apply py-2 text-left font-medium rounded cursor-pointer flex items-center relative;
  &:hover:not(&--active) {
    &,
    & .group-button__actions {
      @apply bg-gray-200;
    }
  }

  &--active {
    &,
    & .group-button__actions {
      @apply bg-purple-200;
    }
  }
}

.group-button__label {
  @apply text-gray-900 truncate inline-block flex-1;
}

.group-button__actions {
  @apply absolute inline-block text-gray-600 bg-white pl-1;
  right: theme('width.2');

  @screen md {
    @apply hidden;

    .side-menu__group-button:hover & {
      @apply inline-block;
    }
  }
}

.group-button__action:hover {
  @apply text-purple-600;
}
</style>
