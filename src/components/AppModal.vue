<template>
  <transition name="modal-fade">
    <div class="app-modal__backdrop" @click.self="close">
      <div
        class="app-modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="app-modal__header">
          <slot name="header">
            This is the default title!

            <button
              type="button"
              class="app-modal__close-button"
              aria-label="Close modal"
              @click="close"
            >
              <font-awesome-icon icon="times" size="lg" />
            </button>
          </slot>
        </header>
        <section id="modalDescription" class="app-modal__body">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>
        <footer class="app-modal__footer">
          <slot name="footer">
            I'm the default footer!
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppModal',

  props: {
    mobileFullScreen: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    document.addEventListener('keydown', this.handleEscKey);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscKey);
  },

  methods: {
    handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close();
      }
    },

    close() {
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" scoped>
.app-modal__backdrop {
  @apply z-40 fixed inset-0 flex justify-center items-center;
  background-color: rgba(0, 0, 0, 0.3);
}

.app-modal {
  @apply flex flex-col shadow-lg bg-white fixed inset-0 overflow-x-auto;

  @screen md {
    @apply fixed inset-auto w-full max-w-3xl;
  }
}

.app-modal__header,
.app-modal__footer {
  @apply p-5 flex;
}

.app-modal__header {
  @apply border-b justify-between;
}

.app-modal__footer {
  @apply border-t justify-end;
}

.app-modal__body {
  @apply p-5 flex-1;
}

.app-modal__close-button {
  @apply text-purple-900;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.35s ease;
}
</style>
