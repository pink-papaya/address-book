<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->

    <div>
      <div v-for="group in groups" :key="group.id">
        {{ group.id }} {{ group.name }}
      </div>

      <button @click="$store.dispatch('groups/add')">Add group</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },

  computed: mapGetters('groups', ['groups']),
});
</script>
