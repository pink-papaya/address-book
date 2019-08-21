<template>
  <button
    :disabled="!networkOnLine"
    :class="{ 'app__create-contact-button--offline': !networkOnLine }"
    type="button"
    class="app__create-contact-button"
    @click="showCreateContactModal"
  >
    <span class="flex items-center justify-center">
      <img
        v-show="!networkOnLine"
        src="@/assets/icons/no-wifi.svg"
        alt=""
        class="h-6 w-6 mr-2 inline"
      />
      <font-awesome-icon v-show="networkOnLine" icon="plus" class="mr-2" />
      {{ buttonLabel }}
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'CreateContactButton',

  computed: {
    ...mapState('app', ['networkOnLine']),
    buttonLabel() {
      return this.networkOnLine ? 'Create contact' : 'Offline';
    },
  },

  methods: mapActions('modals', ['showCreateContactModal']),
});
</script>

<style lang="scss" scoped>
.app__create-contact-button {
  @apply border-2 border-purple-900 text-purple-900 py-2 px-4 font-medium rounded;

  &:disabled {
    @apply cursor-not-allowed;
  }

  &:hover:not(&--offline) {
    @apply bg-purple-900 text-white;
  }

  &--offline {
    @apply border-gray-500 text-gray-500;
  }
}
</style>
