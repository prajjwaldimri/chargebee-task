<template lang="pug">
  v-app
    v-snackbar(v-model="snackbar" top :color="snackbarColor" :timeout="2000") {{snackbarMessage}}
    transition(name="fade-transition" mode="out-in")
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
      this.snackbarMessage = message;
      this.snackbar = true;
      this.snackbarColor = 'error';
    });

    EventBus.$on('show-success-snack', (message) => {
      this.snackbarMessage = message;
      this.snackbar = true;
      this.snackbarColor = 'success';
    });

    EventBus.$on('show-info-snack', (message) => {
      this.snackbarMessage = message;
      this.snackbar = true;
      this.snackbarColor = 'info';
    });
  },
};
</script>

