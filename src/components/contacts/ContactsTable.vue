<template>
  <div class="px-5 pt-5">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th class="md:w-1/3">Name</th>
          <th class="hidden md:table-cell md:w-1/3">Phone</th>
          <th class="hidden md:table-cell md:w-1/3">Group</th>
        </tr>
      </thead>
      <transition-group name="table-fade" tag="tbody">
        <tr
          v-for="contact in contacts"
          :key="contact.name"
          class="hover:bg-purple-100 cursor-pointer"
          @click="showDetails(contact)"
        >
          <td>
            <app-img-loader
              :src="contact.pictureUrl"
              :placeholder-src="contactImgPlaceholder"
              alt=""
              class="h-12 w-12 rounded-full object-cover inline mr-2"
            />
            {{ contact.name }}
          </td>
          <td class="hidden md:table-cell">{{ contact.phone }}</td>
          <td class="hidden md:table-cell">
            {{ contact.groupName }}
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Contact } from '@/store/contacts/types';
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as contactImgPlaceholder from '@/assets/img/contact-default-photo.png';

export default Vue.extend({
  name: 'ContactsTable',

  components: { AppImgLoader },

  data() {
    return {
      activeContact: null as null | Contact,
      contactImgPlaceholder,
    };
  },

  computed: {
    ...mapGetters('contacts', {
      contacts: 'filteredContacts',
    }),
  },

  methods: {
    ...mapActions('modals', ['showViewContactModal']),
    showDetails(contact: Contact) {
      this.showViewContactModal(contact);
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

tr {
  transition: all 0.25s;
}

.table-fade-enter,
.table-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.table-fade-leave-active {
  position: absolute;
}
</style>
