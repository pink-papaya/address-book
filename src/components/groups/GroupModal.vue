<template>
  <app-modal v-show="isCreateGroupModalOpen" @close="close">
    <template #header>
      <div class="font-medium">
        Create contact
      </div>
    </template>

    <template #body>
      <form id="create-group-form" class="w-full" @submit.prevent="createGroup">
        <app-input
          v-model.trim="$v.name.$model"
          :has-error="$v.name.$error"
          label="Name"
          error="Name is required"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.description.$model"
          :has-error="$v.description.$error"
          label="Description"
          error="Description is required"
          type="textarea"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.pictureUrl.$model"
          :has-error="$v.pictureUrl.$error"
          label="Picture url"
          error="Picture url is required"
          class="mb-6"
        />
      </form>
    </template>

    <template #footer>
      <button class="login__button" type="submit" form="create-group-form">
        Save
      </button>
    </template>
  </app-modal>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import AppModal from '@/components/AppModal.vue';
import AppInput from '@/components/AppInput.vue';

export default Vue.extend({
  name: 'GroupModal',

  components: {
    AppModal,
    AppInput,
  },

  validations: {
    name: { required },
    description: { required },
    pictureUrl: { required },
  },

  data() {
    return {
      name: '',
      description: '',
      pictureUrl: '',
    };
  },

  computed: {
    ...mapState('modals', ['isCreateGroupModalOpen']),
    ...mapGetters('groups', ['groups']),
  },
  methods: {
    ...mapActions('modals', ['hideCreateGroupModal']),
    ...mapActions('groups', ['addGroup']),

    close() {
      this.hideCreateGroupModal();

      this.name = '';
      this.description = '';
      this.pictureUrl = '';
    },

    async createGroup() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const { name, description, pictureUrl } = this;

      try {
        await this.addGroup({
          id: `group-${Date.now()}`,
          name,
          description,
          pictureUrl,
        });
      } catch (e) {
        console.log(e);
      }

      this.close();
    },
  },
});
</script>

<style lang="scss" scoped>
.login__input {
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full
  py-2 px-4 text-gray-700 leading-tight;

  transition: all 0.25s;

  &:focus {
    @apply outline-none bg-white border-purple-500;
  }
}

.login__label {
  @apply block text-gray-700 font-bold mb-1;
}

.login__button {
  @apply shadow bg-purple-900 text-white font-bold py-2 px-4 rounded;

  &:hover {
    @apply bg-purple-800;
  }

  &:focus {
    @apply shadow-outline outline-none;
  }
}
</style>
