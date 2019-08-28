<template>
  <app-modal v-if="isChangePasswordModalOpen" @close="close">
    <template #header>
      <div class="font-medium">
        Change password
      </div>
    </template>

    <template #body>
      <form
        id="change-password-form"
        class="w-full"
        @submit.prevent="saveNewPassword"
      >
        <app-input
          v-model.trim="$v.oldPassword.$model"
          :has-error="$v.oldPassword.$error"
          type="password"
          label="Password"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.newPassword.$model"
          :has-error="$v.newPassword.$error"
          :error="passwordError"
          type="password"
          label="New password"
          class="mb-6"
        />
        <app-input
          v-model.trim="$v.repeatPassword.$model"
          :has-error="$v.repeatPassword.$error"
          type="password"
          label="Repeat new password"
          class="mb-6"
        />
      </form>
    </template>

    <template #footer>
      <button
        :disabled="isLoading"
        class="app__button app__button--sm app__button--outline mr-5"
        type="button"
        @click="close"
      >
        Cancel
      </button>

      <button
        :disabled="isLoading"
        class="app__button app__button--sm"
        type="submit"
        form="change-password-form"
      >
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          spin
          class="mr-2"
        />
        Save
      </button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { minLength, required, sameAs, url } from 'vuelidate/lib/validators';
import AppModal from '@/components/AppModal.vue';
import AppInput from '@/components/AppInput.vue';

export default Vue.extend({
  name: 'ChangePasswordModal',

  components: {
    AppModal,
    AppInput,
  },

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      isLoading: false,
    };
  },

  validations: {
    oldPassword: { required },
    newPassword: { required, minLength: minLength(6) },
    repeatPassword: { sameAsNewPassword: sameAs('newPassword') },
  },

  computed: {
    ...mapState('modals', ['isChangePasswordModalOpen']),

    passwordError() {
      return !this.$v.newPassword!.minLength
        ? 'Password must have at least 6 characters'
        : '';
    },
  },
  methods: {
    ...mapActions('modals', ['hideChangePasswordModal']),
    ...mapActions('auth', ['changePassword']),

    close() {
      // @ts-ignore
      this.hideChangePasswordModal();

      this.oldPassword = '';
      this.newPassword = '';
      this.repeatPassword = '';

      // @ts-ignore
      this.$v.$reset();
    },

    async saveNewPassword() {
      // @ts-ignore
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.isLoading = true;

      try {
        // @ts-ignore
        await this.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });

        await this.$dialog.alert({
          title: 'Success',
          body: 'Password successfully changed',
        });

        this.close();
      } catch (e) {
        this.$dialog.alert({
          title: 'Error',
          body: 'Wrong password',
        });
      }

      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
