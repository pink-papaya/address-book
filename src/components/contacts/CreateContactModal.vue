<template>
  <app-modal
    v-show="isCreateContactModalOpen"
    mobile-full-screen
    @close="close"
  >
    <template #header>
      <div class="font-medium">
        Create contact
      </div>
    </template>

    <template #body>
      <form
        id="create-contact-form"
        class="w-full"
        @submit.prevent="createContact"
      >
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
        class="app__button app__button--outline mr-5"
        type="button"
        @click="close"
      >
        Cancel
      </button>

      <button class="app__button" type="submit" form="create-contact-form">
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

const uniqueName = (value: string, vm: any) => !vm.contactByName(value);

export default Vue.extend({
  name: 'CreateContactModal',

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
      groupId: '',
      name: '',
      phone: '',
      pictureUrl: '',
      groupImgPlaceholder,
    };
  },

  computed: {
    ...mapState('modals', ['isCreateContactModalOpen']),
    ...mapGetters('groups', ['groups']),
    ...mapGetters('contacts', ['contactByName']),

    nameError() {
      // @ts-ignore
      return this.$v.name.$uniqueName
        ? 'Name is required'
        : "There's already a contact with that name";
    },
  },
  methods: {
    ...mapActions('modals', ['hideCreateContactModal']),
    ...mapActions('contacts', ['addContact']),

    close() {
      // @ts-ignore
      this.hideCreateContactModal();

      this.groupId = '';
      this.name = '';
      this.phone = '';
      this.pictureUrl = '';
      // @ts-ignore
      this.$v.$reset();
    },

    async createContact() {
      const { groupId, name, phone, pictureUrl } = this;

      // @ts-ignore
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.close();

      try {
        // @ts-ignore
        await this.addContact({
          groupId,
          name,
          phone,
          pictureUrl,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
