<template>
  <app-modal v-show="isCreateGroupModalOpen" mobile-full-screen @close="close">
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
          type="textarea"
          rows="4"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.pictureUrl.$model"
          :has-error="$v.pictureUrl.$error"
          label="Picture url"
          error="Picture url must be a valid url"
          class="mb-6"
        />
      </form>
    </template>

    <template #footer>
      <button
        class="app__button app__button--sm app__button--outline mr-5"
        type="button"
        @click="close"
      >
        Cancel
      </button>

      <button
        class="app__button app__button--sm"
        type="submit"
        form="create-group-form"
      >
        Save
      </button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { required, url } from 'vuelidate/lib/validators';
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
    description: {},
    pictureUrl: { url },
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

      // @ts-ignore
      this.$v.$reset();
    },

    async createGroup() {
      // @ts-ignore
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

<style lang="scss" scoped></style>
