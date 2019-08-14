<template>
  <login-layout>
    <form class="w-full max-w-sm" @submit.prevent="login">
      <div class="mb-6">
        <label class="login__label" for="username">
          Username
        </label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="login__input"
        />
      </div>
      <div class="mb-6">
        <label class="login__label" for="password">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="login__input"
        />
      </div>
      <button class="login__button" type="submit">
        Log In
      </button>
      <div class="mt-6 text-gray-700">
        Don't have an account?
        <router-link
          class="text-purple-900 hover:text-purple-800 hover:text-underline"
          to="/register"
        >
          Sign Up here
        </router-link>
      </div>
    </form>
  </login-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginLayout from '@/components/layouts/LoginLayout.vue';

export default Vue.extend({
  name: 'Login',

  components: { LoginLayout },

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async login() {
      await this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password,
      });

      this.$router.push('/');
    },
  },
});
</script>

<style lang="scss" scoped></style>
