<template>
  <app-modal v-show="isGroupModalOpen" mobile-full-screen @close="close">
    <template #header>
      <div class="font-medium">
        {{ title }}
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
        :disabled="isSaving"
        class="app__button app__button--sm app__button--outline mr-5"
        type="button"
        @click="close"
      >
        Cancel
      </button>

      <button
        :disabled="isSaving"
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

  data() {
    return {
      isSaving: false,
    };
  },

  validations: {
    name: { required },
    description: {},
    pictureUrl: { url },
  },

  computed: {
    ...mapState('modals', ['isGroupModalOpen']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('groups/form', ['isEdit', 'group']),

    title(): string {
      // @ts-ignore
      return this.isEdit ? 'Update group' : 'Create group';
    },

    name: {
      get() {
        return this.$store.state.groups.form.name;
      },
      set(value) {
        this.$store.commit('groups/form/setName', value);
      },
    },
    description: {
      get() {
        return this.$store.state.groups.form.description;
      },
      set(value) {
        this.$store.commit('groups/form/setDescription', value);
      },
    },
    pictureUrl: {
      get() {
        return this.$store.state.groups.form.pictureUrl;
      },
      set(value) {
        this.$store.commit('groups/form/setPictureUrl', value);
      },
    },
  },
  methods: {
    ...mapActions('modals', ['hideGroupModal']),
    ...mapActions('groups', ['saveGroup']),
    ...mapActions('groups/form', ['clearGroup']),

    close() {
      // @ts-ignore
      this.hideGroupModal();
      // @ts-ignore
      this.clearGroup();
      // @ts-ignore
      this.$v.$reset();
    },

    async createGroup() {
      // @ts-ignore
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.isSaving = true;

      // @ts-ignore
      const group = { ...this.group };

      this.close();

      try {
        // @ts-ignore
        await this.saveGroup(group);
      } catch (e) {
        this.$dialog.alert({
          title: 'Network error',
          body:
            'It was not possible to save the group. Please try again later.',
        });
      }

      this.isSaving = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
