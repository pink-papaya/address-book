<template>
  <div>
    <contacts-table />
    <create-contact-modal />
    <create-group-modal />

    <create-contact-button class="fixed md:hidden" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ContactsTable from '@/components/contacts/ContactsTable.vue';
import CreateContactModal from '@/components/contacts/CreateContactModal.vue';
import CreateGroupModal from '@/components/groups/GroupModal.vue';
import CreateContactButton from '@/components/contacts/CreateContactButton.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    ContactsTable,
    CreateContactButton,
    CreateContactModal,
    CreateGroupModal,
  },
  methods: mapActions('modals', ['showCreateContactModal']),
});
</script>

<style lang="scss" scoped>
.app__create-contact-button {
  bottom: theme('height.5');
  right: theme('width.5');
}
</style>
