<template lang="pug">
  v-app
    v-snackbar(v-model="snackbar" top :color="snackbarColor" :timeout="2000") {{snackbarMessage}}
    router-view
</template>

<script>
import { EventBus } from './event-bus';

export default {
  data() {
    return {
      snackbarMessage: '',
      snackbar: false,
      snackbarColor: '',
    };
  },
  mounted() {
    EventBus.$on('show-error-snack', (message) => {
      console.log(message);
      this.snackbarMessage = message;
      this.snackbar = true;
      this.snackbarColor = 'red darken-3';
    });
  },
};
</script>

