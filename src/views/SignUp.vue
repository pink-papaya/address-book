<template>
  <login-layout>
    <form class="w-full max-w-sm" @submit.prevent="register">
      <app-input
        v-model="$v.username.$model"
        :has-error="$v.username.$error"
        label="Username"
        class="mb-6"
      />
      <app-input
        v-model="$v.password.$model"
        :has-error="$v.password.$error"
        :error="passwordError"
        label="Password"
        type="password"
        class="mb-6"
      />
      <app-input
        v-model="$v.repeatPassword.$model"
        :has-error="$v.repeatPassword.$error"
        label="Repeat password"
        type="password"
        class="mb-6"
      />

      <button :disabled="isLoading" class="app__button" type="submit">
        <font-awesome-icon
          v-show="isLoading"
          icon="spinner"
          spin
          class="mr-2"
        />
        Sign Up
      </button>

      <div class="mt-6 text-gray-700">
        Already have an account?
        <router-link class="login__link" to="/login">
          Log in here
        </router-link>
      </div>
    </form>
  </login-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import LoginLayout from '@/components/layouts/LoginLayout.vue';
import AppInput from '@/components/AppInput.vue';

export default Vue.extend({
  name: 'SignUp',

  components: { LoginLayout, AppInput },

  data() {
    return {
      username: '',
      password: '',
      repeatPassword: '',
      isLoading: false,
      hasError: false,
    };
  },

  validations: {
    username: { required },
    password: { required, minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') },
  },

  computed: {
    passwordError() {
      return !this.$v.password!.minLength
        ? 'Password must have at least 6 characters'
        : '';
    },
  },

  methods: {
    async register() {
      // @ts-ignore
      this.$v.$touch();

      if (this.isLoading || this.$v.$invalid) {
        return;
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch('auth/register', {
          username: this.username,
          password: this.password,
        });

        this.$router.push('/');
      } catch (e) {
        this.hasError = true;
        // @todo show error
      }

      this.isLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
