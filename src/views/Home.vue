<template>
  <div class="pt-5">
    <contacts-table />
    <create-contact-modal />
    <create-group-modal />

    <button
      type="button"
      class="app__create-contact-button fixed md:hidden"
      @click="showCreateContactModal"
    >
      <font-awesome-icon icon="plus" class="mx-2" />
      Create contact
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ContactsTable from '@/components/contacts/ContactsTable.vue';
import CreateContactModal from '@/components/contacts/CreateContactModal.vue';
import CreateGroupModal from '@/components/groups/GroupModal.vue';

export default Vue.extend({
  name: 'Home',
  components: { ContactsTable, CreateContactModal, CreateGroupModal },
  methods: mapActions('modals', ['showCreateContactModal']),
});
</script>

<style lang="scss" scoped>
.app__create-contact-button {
  bottom: theme('height.5');
  right: theme('width.5');
}
</style>
