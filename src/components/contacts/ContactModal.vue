<template>
  <app-modal v-if="isCreateContactModalOpen" mobile-full-screen @close="close">
    <template #header>
      <div class="font-medium">
        {{ title }}
      </div>
    </template>

    <template #body>
      <form id="create-contact-form" class="w-full" @submit.prevent="save">
        <app-select
          v-model="$v.groupId.$model"
          :has-error="$v.groupId.$error"
          :options="groups"
          :reduce="group => group.id"
          option-label="name"
          label="Group"
          error="Group is required"
          class="mb-6"
        >
          <template #option="{ option }">
            <app-img-loader
              :src="option.pictureUrl"
              :placeholder-src="groupImgPlaceholder"
              alt=""
              class="h-8 w-8 inline mr-2 object-cover rounded-full"
            />
            {{ option.name }}
          </template>
        </app-select>

        <app-input
          v-model.trim="$v.name.$model"
          :has-error="$v.name.$error"
          :error="nameError"
          label="Name"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.phone.$model"
          :has-error="$v.phone.$error"
          label="Phone"
          error="Phone is required"
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
        form="create-contact-form"
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
import AppSelect from '@/components/AppSelect.vue';
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as groupImgPlaceholder from '@/assets/img/group-default-photo.png';

const uniqueName = (value: string, vm: any) => {
  if (!value) {
    return true;
  }

  const contact = vm.contactByName(value);
  // the contact can have it's original name
  return !contact || contact.id === vm.contact.id;
};

export default Vue.extend({
  name: 'ContactModal',

  components: {
    AppModal,
    AppInput,
    AppSelect,
    AppImgLoader,
  },

  validations: {
    groupId: { required },
    name: { required, uniqueName },
    phone: { required },
    pictureUrl: { url },
  },

  data() {
    return {
      groupImgPlaceholder,
    };
  },

  computed: {
    ...mapState('modals', ['isCreateContactModalOpen']),
    ...mapGetters('contacts/form', ['isEdit', 'contact']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('contacts', ['contactByName']),

    groupId: {
      get() {
        return this.$store.state.contacts.form.groupId;
      },
      set(value) {
        this.$store.commit('contacts/form/setGroupId', value);
      },
    },
    name: {
      get() {
        return this.$store.state.contacts.form.name;
      },
      set(value) {
        this.$store.commit('contacts/form/setName', value);
      },
    },
    phone: {
      get() {
        return this.$store.state.contacts.form.phone;
      },
      set(value) {
        this.$store.commit('contacts/form/setPhone', value);
      },
    },
    pictureUrl: {
      get() {
        return this.$store.state.contacts.form.pictureUrl;
      },
      set(value) {
        this.$store.commit('contacts/form/setPictureUrl', value);
      },
    },

    title(): string {
      // @ts-ignore
      return this.isEdit ? 'Update contact' : 'Create contact';
    },

    nameError(): string {
      // @ts-ignore
      return this.$v.name.uniqueName
        ? 'Name is required'
        : "There's already a contact with that name";
    },
  },
  methods: {
    ...mapActions('modals', ['hideContactModal', 'showViewContactModal']),
    ...mapActions('contacts', ['saveContact']),
    ...mapActions('contacts/form', ['clearContact']),

    close() {
      // @ts-ignore
      this.hideContactModal();
      // @ts-ignore
      this.clearContact();
      // @ts-ignore
      this.$v.$reset();
    },

    async save() {
      // @ts-ignore
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      // @ts-ignore
      const contact = { ...this.contact };

      this.close();

      try {
        // @ts-ignore
        await this.saveContact(contact);
      } catch (e) {
        this.$dialog.alert({
          title: 'Network error',
          body:
            'It was not possible to save the contact. Please try again later.',
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
