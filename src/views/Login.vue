<template>
  <login-layout>
    <form class="w-full max-w-sm" @submit.prevent="login">
      <app-input
        v-model="$v.username.$model"
        :has-error="$v.username.$error"
        label="Username"
        class="mb-6"
      />
      <app-input
        v-model="$v.password.$model"
        :has-error="$v.password.$error"
        label="Password"
        type="password"
        class="mb-6"
      />

      <button :disabled="isLoggingIn" class="app__button" type="submit">
        <font-awesome-icon
          v-show="isLoggingIn"
          icon="spinner"
          spin
          class="mr-2"
        />
        Log In
      </button>

      <div class="mt-6 text-gray-700">
        Don't have an account?
        <router-link class="login__link" to="/signup">
          Sign Up here
        </router-link>
      </div>
    </form>
  </login-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { required } from 'vuelidate/lib/validators';
import LoginLayout from '@/components/layouts/LoginLayout.vue';
import AppInput from '@/components/AppInput.vue';

export default Vue.extend({
  name: 'Login',

  components: { LoginLayout, AppInput },

  data() {
    return {
      username: '',
      password: '',
      isLoggingIn: false,
      errorLoggingIn: false,
    };
  },

  validations: {
    username: { required },
    password: { required },
  },

  methods: {
    async login() {
      // @ts-ignore
      this.$v.$touch();

      if (this.isLoggingIn || this.$v.$invalid) {
        return;
      }

      this.isLoggingIn = true;

      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password,
        });

        this.$router.push('/');
      } catch (e) {
        this.errorLoggingIn = true;
        // @todo show error
      }

      this.isLoggingIn = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
