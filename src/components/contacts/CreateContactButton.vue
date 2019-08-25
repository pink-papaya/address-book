<template>
  <button
    :disabled="!networkOnLine"
    :class="{ 'app__create-contact-button--offline': !networkOnLine }"
    type="button"
    class="app__create-contact-button app__button app__button--outline"
    @click="showModal"
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
      // @ts-ignore
      return this.networkOnLine ? 'Create contact' : 'Offline';
    },
  },

  methods: {
    ...mapActions('modals', ['showContactModal']),

    showModal() {
      // @ts-ignore
      this.showContactModal();
    },
  },
});
</script>

<style lang="scss" scoped>
.app__create-contact-button {
  &--offline {
    @apply border-gray-500 text-gray-500;

    &:hover {
      @apply bg-white text-gray-500;
    }
  }
}
</style>
