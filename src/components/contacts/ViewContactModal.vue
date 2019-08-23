<template>
  <app-modal v-if="isViewContactModalOpen" @close="close">
    <template #header>
      <div class="font-medium">
        Contact details
      </div>
    </template>

    <template #body>
      <div v-if="contact">
        <div class="flex items-center mb-5">
          <app-img-loader
            :src="contact.pictureUrl"
            :placeholder-src="contactImgPlaceholder"
            class="h-24 w-24 rounded-full object-cover inline mr-5"
          />
          <div class="text-2xl font-medium break-all">{{ contact.name }}</div>
        </div>

        <div v-if="group" class="flex items-center mb-5">
          <span class="font-medium inline-block w-12 text-gray-800 mr-5">
            Group
          </span>
          <app-img-loader
            :src="group.pictureUrl"
            :placeholder-src="groupImgPlaceholder"
            alt=""
            class="h-10 w-10 inline mr-2 object-cover rounded-full"
          />
          <div class="break-all font-medium">{{ group.name }}</div>
        </div>
        <div class="flex items-center">
          <span class="font-medium inline-block w-12 text-gray-800 mr-5">
            Phone
          </span>
          <div class="break-all">{{ contact.phone }}</div>
        </div>
      </div>
    </template>

    <template #footer>
      <button
        class="app__button app__button--sm app__button--outline mr-5"
        type="button"
        @click="deleteContact"
      >
        Delete
      </button>
      <button
        class="app__button app__button--sm"
        type="button"
        @click="editContact"
      >
        Edit
      </button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import AppModal from '@/components/AppModal.vue';
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as contactImgPlaceholder from '@/assets/img/contact-default-photo.png';
import * as groupImgPlaceholder from '@/assets/img/group-default-photo.png';
import { Group } from '@/store/groups/types';
import { Contact } from '@/store/contacts/types';

export default Vue.extend({
  name: 'ViewContactModal',

  components: {
    AppModal,
    AppImgLoader,
  },

  data() {
    return {
      contactImgPlaceholder,
      groupImgPlaceholder,
    };
  },

  computed: {
    ...mapState('modals', {
      isViewContactModalOpen: 'isViewContactModalOpen',
      contactId: 'contactModalModelId',
    }),
    ...mapGetters('contacts', ['contactById']),
    ...mapGetters('groups', ['groupById']),

    contact(): Contact {
      // @ts-ignore
      return this.contactById(this.contactId);
    },

    group(): Group {
      // @ts-ignore
      return this.groupById(this.contact.groupId);
    },
  },
  methods: {
    ...mapActions('modals', ['hideViewContactModal', 'showCreateContactModal']),
    ...mapActions('contacts', ['addContact']),

    close() {
      // @ts-ignore
      this.hideViewContactModal();
    },

    editContact() {
      // this.close();
      // @ts-ignore
      this.showCreateContactModal(this.contact);
    },

    deleteContact() {
    },
  },
});
</script>

<style lang="scss" scoped></style>
