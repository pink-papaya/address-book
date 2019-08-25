// make ts compiler stop complaining about imported pngs
declare module '*.png';

declare module 'vue-select';

declare module 'vuejs-dialog' {
  module 'vue/types/vue' {
    interface Vue {
      $dialog: any;
    }
  }
}
