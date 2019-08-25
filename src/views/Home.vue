<template>
  <app-layout>
    <contacts-table />
    <view-contact-modal />
    <contact-modal />
    <group-modal />
    <change-password-modal />

    <create-contact-button class="fixed lg:hidden" />
  </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ContactsTable from '@/components/contacts/ContactsTable.vue';
import ContactModal from '@/components/contacts/ContactModal.vue';
import GroupModal from '@/components/groups/GroupModal.vue';
import CreateContactButton from '@/components/contacts/CreateContactButton.vue';
import ViewContactModal from '@/components/contacts/ViewContactModal.vue';
import AppLayout from '@/components/layouts/AppLayout.vue';
import ChangePasswordModal from '@/components/ChangePasswordModal.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    AppLayout,
    ContactsTable,
    CreateContactButton,
    ContactModal,
    ViewContactModal,
    GroupModal,
    ChangePasswordModal,
  },
  methods: mapActions('modals', ['showContactModal']),
});
</script>

<style lang="scss" scoped>
.app__create-contact-button {
  bottom: theme('height.5');
  right: theme('width.5');
}
</style>
