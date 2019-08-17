<template>
  <div class="px-5">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="w-16"></th>
          <th>Name</th>
          <th class="hidden md:table-cell">Phone</th>
          <th class="hidden md:table-cell">Group</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="contact in contacts"
          :key="contact.name"
          class="hover:bg-purple-100 hover:cursor-pointer"
          @click="showDetails(contact)"
        >
          <td class="">
            <img
              :src="contact.pictureUrl"
              :alt="contact.name"
              class="h-12 w-12 rounded-full object-cover"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td class="hidden md:table-cell">{{ contact.phone }}</td>
          <td class="hidden md:table-cell">
            {{ getGroupById(contact.groupId).name }}
          </td>
        </tr>
      </tbody>
    </table>

    <app-modal
      v-show="activeContact"
      mobile-full-screen
      @close="activeContact = null"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AppModal from '@/components/AppModal.vue';
import { Contact } from '@/store/contacts/types';

export default Vue.extend({
  name: 'ContactsTable',

  components: { AppModal },

  data() {
    return {
      activeContact: null as null | Contact,
    };
  },

  computed: {
    ...mapGetters('contacts', ['contacts']),
    ...mapGetters('groups', ['getGroupById']),
  },

  methods: {
    showDetails(contact: Contact) {
      this.activeContact = contact;
    },
  },
});
</script>

<style lang="scss" scoped>
th,
td {
  @apply text-left p-2;
}

th {
  @apply text-gray-700 font-medium;
}
</style>
