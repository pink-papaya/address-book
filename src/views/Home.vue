<template>
  <div class="pt-5">
    <contacts-table />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactsTable from '@/components/contacts/ContactsTable.vue';

export default Vue.extend({
  name: 'Home',
  components: { ContactsTable },
});
</script>
