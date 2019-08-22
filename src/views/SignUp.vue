<template>
  <login-layout>
    <form class="w-full max-w-sm" @submit.prevent="register">
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
      <button class="app__button" type="submit">
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
import LoginLayout from '@/components/layouts/LoginLayout.vue';

export default Vue.extend({
  name: 'SignUp',

  components: { LoginLayout },

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async register() {
      await this.$store.dispatch('auth/register', {
        username: this.username,
        password: this.password,
      });

      this.$router.push('/login');
    },
  },
});
</script>

<style lang="scss" scoped></style>
