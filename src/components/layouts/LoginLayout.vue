<template>
  <div
    class="flex flex-col justify-center items-center w-full min-h-screen bg-gray-400 px-5 md:p-0"
  >
    <div
      class="login__logo font-bold text-3xl flex justify-center items-center text-purple-900 mb-6"
    >
      <img
        src="@/assets/icons/logo.svg"
        alt="logo"
        class="inline h-8 w-auto mr-2"
      />
      <span class="">Address Book</span>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginLayout',
});
</script>

<style lang="scss" scoped>
.login__logo {
  margin-top: -69px;

  @media screen and (max-height: 460px) {
    margin-top: 0;
  }
}

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

.login__link {
  @apply text-purple-900;
  &:hover {
    @apply text-purple-800 underline;
  }
}
</style>
