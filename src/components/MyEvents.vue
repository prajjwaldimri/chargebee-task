<template lang="pug">
  .my-events
    AddEvent
    EditEvent
    v-container(fluid)
      v-toolbar(flat color="white")
        v-toolbar-title Event Management
        v-spacer
        v-btn(color="primary" dark @click="addItem").mb-2 Add New Event

      v-data-table(:items="user.events" :headers="headers" :loading="loading").elevation-1
        v-progress-linear(slot="progress" color="blue" indeterminate)
        template(slot="items" slot-scope="props")
          td.justify-center.layout.px-0
            v-icon(small @click="editItem(props.item)").mr-2 edit
            v-icon(small @click="deleteItem(props.item.id)") delete
          td {{props.item.eventName}}
          td {{props.item.description}}
          td {{props.item.duration}}
          td {{props.item.fees}}
          td {{props.item.location}}
          td {{props.item.maxParticipants}}
          td {{props.item.tags}}
          td {{props.item.fieldsRequired}}

</template>

<script>
import { EventBus } from '../event-bus';
import AddEvent from './AddEvent.vue';
import EditEvent from './EditEvent.vue';

export default {
  components: {
    AddEvent,
    EditEvent,
  },
  data() {
    return {
      email: '',
      loading: false,
      user: {},
      headers: [
        { text: 'Actions', value: 'action', sortable: false },
        { text: 'Event Name', value: 'eventName' },
        { text: 'Description', value: 'description' },
        { text: 'Duration', value: 'duration' },
        { text: 'Fees', value: 'fees' },
        { text: 'Location', value: 'location' },
        { text: 'Max Participants', value: 'maxParticipants' },
        { text: 'Tags', value: 'tags' },
        { text: 'Fields Required', value: 'fieldsRequired' },
      ],
    };
  },
  mounted() {
    this.getEvents();
    EventBus.$on('update-my-events', () => {
      this.getEvents();
    });
  },
  methods: {
    deleteItem(itemId) {
      const index = this.user.events.indexOf(this.user.events.find(event => event.id === itemId));
      this.user.events.splice(index, 1);
      this.$cookies.set(this.email, JSON.stringify(this.user));
      EventBus.$emit('show-success-snack', 'Successfully Deleted');
      this.getEvents();
    },
    addItem() {
      EventBus.$emit('show-add-dialog');
    },
    getEvents() {
      this.loading = true;
      this.email = this.$cookies.get('authenticatedUser');
      // Loads events from cookies
      this.user = this.$cookies.get(this.email);
      this.loading = false;
    },
    editItem(item) {
      EventBus.$emit('show-edit-dialog', item);
    },
  },
};
</script>

