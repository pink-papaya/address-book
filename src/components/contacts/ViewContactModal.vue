<template>
  <app-modal v-show="isViewContactModalOpen" @close="close">
    <template #header>
      <div class="font-medium">
        Contact details
      </div>
    </template>

    <template #body>
      <div v-if="contact">
        <div class="pb-5">
          <app-img-loader
            :src="contact.pictureUrl"
            :placeholder-src="contactImgPlaceholder"
            class="h-24 w-24 rounded-full object-cover inline mr-5"
          />
          <span class="text-2xl font-medium">{{ contact.name }}</span>
        </div>

        <div v-if="group">
          <app-img-loader
            :src="group.pictureUrl"
            :placeholder-src="groupImgPlaceholder"
            alt=""
            class="h-10 w-10 inline mr-2 object-cover rounded-full"
          />
          <span class=" font-medium">{{ group.name }}</span>
        </div>
        <div>
          <span class="font-medium">Phone</span>
          {{ contact.phone }}
        </div>
      </div>
    </template>

    <template #footer>
      <button class="app__button mr-5" type="button">
        Delete
      </button>
      <button class="app__button" type="button">
        Edit
      </button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import { required, url } from 'vuelidate/lib/validators';
import AppModal from '@/components/AppModal.vue';
import AppImgLoader from '@/components/AppImgLoader.vue';
import * as contactImgPlaceholder from '@/assets/img/contact-default-photo.png';
import * as groupImgPlaceholder from '@/assets/img/group-default-photo.png';

export default Vue.extend({
  name: 'CreateContactModal',

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
      contact: 'contactModalModel',
    }),
    ...mapGetters('groups', ['getGroupById']),

    group() {
      // @ts-ignore
      return this.getGroupById(this.contact.groupId);
    },
  },
  methods: {
    ...mapActions('modals', ['hideViewContactModal']),
    ...mapActions('contacts', ['addContact']),

    close() {
      // @ts-ignore
      this.hideViewContactModal();
    },
  },
});
</script>

<style lang="scss" scoped></style>
