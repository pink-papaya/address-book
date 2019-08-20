<template>
  <app-modal v-show="isCreateContactModalOpen" @close="hideCreateContactModal">
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
        <div class="mb-6">
          <label class="login__label" for="name">
            Name
          </label>
          <input
            id="name"
            v-model.trim="$v.name.$model"
            type="text"
            class="login__input"
          />
          <span v-show="$v.name.$error">
            This field is required.
          </span>
        </div>
        <div class="mb-6">
          <label class="login__label" for="phone">
            Phone
          </label>
          <input id="phone" v-model="phone" type="text" class="login__input" />
        </div>
        <div class="mb-6">
          <label class="login__label" for="picture">
            Picture url
          </label>
          <input
            id="picture"
            v-model="pictureUrl"
            type="text"
            class="login__input"
          />
        </div>
        <div class="mb-6">
          <label class="login__label" for="group">
            Group
          </label>
          <div class="relative">
            <select
              id="group"
              v-model="groupId"
              class="block appearance-none w-full bg-gray-200 border-2 border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              <option>Select a group</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
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

export default Vue.extend({
  name: 'CreateContactModal',

  components: {
    AppModal,
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
    };
  },

  computed: {
    ...mapState('modals', ['isCreateContactModalOpen']),
    ...mapGetters('groups', ['groups']),
  },
  methods: {
    ...mapActions('modals', ['hideCreateContactModal']),
    ...mapActions('contacts', ['addContact']),

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
      return null;
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
