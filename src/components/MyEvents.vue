<template lang="pug">
  .my-events
    AddEvent
    h1 My Events
</template>

<script>
import { EventBus } from '../event-bus';
import AddEvent from './AddEvent.vue';

export default {
  components: {
    AddEvent,
  },
  data() {
    return {};
  },
  mounted() {
    EventBus.$emit('show-add-dialog');
  },
};
</script>

