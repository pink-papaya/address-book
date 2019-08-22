<template>
  <div class="app-input">
    <label class="app-input__label" :for="id">
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :value="value"
      :type="type"
      :class="{ 'app-input__input--has-error': hasError }"
      v-bind="$attrs"
      class="app-input__input"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-else
      :id="id"
      :value="value"
      :type="type"
      :class="{ 'app-input__input--has-error': hasError }"
      v-bind="$attrs"
      class="app-input__input"
      @input="$emit('input', $event.target.value)"
    />
    <span v-show="hasError" class="app-input__error">
      {{ error }}
    </span>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'AppInput',

  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    id() {
      return this.label.replace(/\s/g, '');
    },
  },
});
</script>

<style scoped lang="scss"></style>
