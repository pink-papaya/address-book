<template>
  <div class="pt-5">
    <contacts-table />
    <create-contact-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ContactsTable from '@/components/contacts/ContactsTable.vue';
import CreateContactModal from '@/components/contacts/CreateContactModal.vue';

export default Vue.extend({
  name: 'Home',
  components: { ContactsTable, CreateContactModal },
});
</script>
