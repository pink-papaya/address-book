<template>
  <app-modal v-show="isCreateContactModalOpen" @close="close">
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
          label="Name"
          error="Name is required"
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
          error="Picture url is required"
          class="mb-6"
        />
      </form>
    </template>

    <template #footer>
      <button class="login__button" type="submit" form="create-contact-form">
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
import AppSelect from '@/components/AppSelect.vue';
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as groupImgPlaceholder from '@/assets/img/group-default-photo.png';

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
    name: { required },
    phone: { required },
    pictureUrl: { required },
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
  },
  methods: {
    ...mapActions('modals', ['hideCreateContactModal']),
    ...mapActions('contacts', ['addContact']),

    close() {
      this.hideCreateContactModal();

      this.groupId = '';
      this.name = '';
      this.phone = '';
      this.pictureUrl = '';
      this.$v.$reset();
    },

    async createContact() {
      const { groupId, name, phone, pictureUrl } = this;

      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.addContact({
          groupId,
          name,
          phone,
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
