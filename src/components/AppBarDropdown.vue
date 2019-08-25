<template>
  <div class="app-bar-dropdown relative lg:mx-5 text-center">
    <a
      class="font-medium text-gray-900 flex items-center justify-center cursor-pointer"
      @click="isUserMenuOpen = !isUserMenuOpen"
    >
      <span
        class="app-bar-dropdown__username-label inline-block truncate lg:text-right"
      >
        {{ username }}
      </span>

      <svg
        class="h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </a>
    <transition name="dropdown-fade">
      <div
        v-show="isUserMenuOpen"
        class="lg:absolute inset-x-0 lg:shadow-xl rounded bg-white px-5 pt-5 overflow-hidden lg:text-left"
      >
        <a
          v-if="networkOnLine"
          class="block font-medium text-purple-900 pb-5 cursor-pointer"
          @click="showChangePasswordModal"
        >
          Change password
        </a>
        <a
          v-if="networkOnLine"
          class="block font-medium text-red-600 pb-5 cursor-pointer"
          @click="deleteAccount"
        >
          Delete account
        </a>
        <a
          class="block font-medium text-purple-900 lg:pb-5 cursor-pointer"
          @click="logout"
        >
          Logout
        </a>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default Vue.extend({
  name: 'AppBarDropdown',

  data() {
    return {
      isUserMenuOpen: false,
    };
  },

  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapGetters('auth', ['username']),
  },

  mounted() {
    const listener = (e: Event) => {
      if (e.target !== this.$el && !this.$el.contains(e.target as Node)) {
        this.isUserMenuOpen = false;
      }
    };
    document.addEventListener('click', listener);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', listener);
    });
  },

  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('auth', ['deleteAddressBook']),
    ...mapActions('modals', ['showChangePasswordModal']),

    async deleteAccount() {
      try {
        await this.$dialog.confirm(
          {
            title: 'Attention',
            body:
              'Are you sure you want to delete your account? This action is irreversible!',
          },
          {
            customClass: 'delete-modal',
            okText: 'Yes, delete my account',
            cancelText: 'Cancel',
            type: 'hard',
            verification: "yes I'm sure",
          },
        );

        try {
          this.deleteAddressBook();
        } catch (e) {
          this.$dialog.alert({
            title: 'Network error',
            body:
              'It was not possible to delete you account. Please try again later.',
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
.app-bar-dropdown__username-label {
  max-width: theme('width.48');

  @screen lg {
    min-width: theme('width.40');
  }
}

.dropdown-fade-enter,
.dropdown-fade-leave-active {
  opacity: 0;
  transform: translateY(-15px);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.35s ease;
}

.dropdown-fade-leave-active {
  position: absolute;
}
</style>
