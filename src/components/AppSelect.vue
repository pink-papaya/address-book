<template>
  <div class="app-select">
    <label class="app-input__label" :for="id">
      {{ label }}
    </label>
    <v-select
      :id="id"
      :value="value"
      :label="optionLabel"
      :class="{ 'app-select__input--has-error': hasError }"
      v-bind="$attrs"
      class="app-select__input"
      @input="$emit('input', $event)"
    >
      <template slot="option" slot-scope="option">
        <slot name="option" :option="option"></slot>
      </template>
    </v-select>
    <span v-show="hasError" class="app-input__error">
      {{ error }}
    </span>
  </div>
</template>

<script>
import Vue from 'vue';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default Vue.extend({
  name: 'AppSelect',

  components: {
    VSelect,
  },

  props: {
    value: {
      type: [String, Object],
      default: '',
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
    optionLabel: {
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

<style scoped lang="scss">
::v-deep .v-select {
  .vs__dropdown-toggle {
    @apply border-2 rounded p-0 border-gray-200 bg-gray-200;
    transition: all 0.25s;
  }

  .vs__actions {
    @apply py-0;
  }

  .vs__selected-options {
    @apply p-0;
  }

  .vs__search,
  .vs__selected {
    @apply py-2 px-4 text-gray-700 leading-tight m-0;
  }

  &.vs--open {
    .vs__dropdown-toggle {
      @apply bg-white;
    }

    .vs__dropdown-toggle {
      @apply border-purple-500;
    }
  }
}

::v-deep .app-select__input--has-error {
  &.vs--open .vs__dropdown-toggle,
  .vs__dropdown-toggle {
    @apply border-red-500;
  }
}
</style>
