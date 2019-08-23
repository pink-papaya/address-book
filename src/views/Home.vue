<template>
  <app-layout>
    <contacts-table />
    <create-contact-modal />
    <view-contact-modal />
    <create-group-modal />

    <create-contact-button class="fixed md:hidden" />
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ContactsTable from '@/components/contacts/ContactsTable.vue';
import CreateContactModal from '@/components/contacts/CreateContactModal.vue';
import CreateGroupModal from '@/components/groups/GroupModal.vue';
import CreateContactButton from '@/components/contacts/CreateContactButton.vue';
import ViewContactModal from '@/components/contacts/ViewContactModal.vue';
import AppLayout from '@/components/layouts/AppLayout.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    AppLayout,
    ContactsTable,
    CreateContactButton,
    CreateContactModal,
    ViewContactModal,
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
