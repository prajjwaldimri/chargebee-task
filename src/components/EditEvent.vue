<template lang="pug">
  v-dialog(v-model="dialog" width="500" persistent)
    v-card
      v-card-title.headline(primary-title).blue.white--text Edit Event
      v-card-text
        form
          v-text-field(v-validate="'required|min:4'" v-model="eventName" prepend-icon="event"
          :error-messages="errors.collect('eventName')" label="Event Name" data-vv-name="eventName")

          v-textarea(v-validate="'required|min:4'" v-model="description" prepend-icon="event_note"
          :error-messages="errors.collect('description')" label="Description"
            data-vv-name="description")

          v-text-field(v-validate="'required|min:4'" v-model="duration" prepend-icon="av_timer"
          :error-messages="errors.collect('duration')" label="Time Duration"
            data-vv-name="duration")

          v-text-field(v-validate="'required|min:4'" v-model="location" prepend-icon="location_on"
          :error-messages="errors.collect('location')" label="Location"
            data-vv-name="location")

          v-text-field(v-validate="'required|numeric'" v-model="fees" prepend-icon="money"
          :error-messages="errors.collect('fees')" label="Fees"
            data-vv-name="fees")

          v-text-field(v-validate="'required'" v-model="tags" prepend-icon="bookmarks"
          :error-messages="errors.collect('tags')" label="Tags (separated by commas)"
            data-vv-name="tags")

          v-text-field(v-validate="'required|numeric'" v-model="maxParticipants"
          prepend-icon="event_seat"
          :error-messages="errors.collect('maxParticipants')" label="Maximum Participants"
            data-vv-name="maxParticipants" type="number")

          v-combobox(v-model="fieldsRequired" multiple chips
          label="Fields required from registering users")

      v-divider

      v-card-actions
        v-spacer
        v-btn(color="primary" @click="saveEvent")
          v-icon.pr-2 save
          span Save
        v-btn(@click="dialog = false")
          v-icon.pr-2 close
          span close
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  $_veeValidate: {
    validator: 'new',
  },
  data() {
    return {
      email: '',
      dialog: false,
      id: '',
      eventName: '',
      description: '',
      duration: '',
      location: '',
      fees: '',
      tags: '',
      maxParticipants: 1,
      fieldsRequired: ['Name'],
    };
  },
  mounted() {
    this.email = this.$cookies.get('authenticatedUser');
    EventBus.$on('show-edit-dialog', (event) => {
      this.dialog = true;
      this.id = event.id;
      this.eventName = event.eventName;
      this.description = event.description;
      this.duration = event.duration;
      this.location = event.location;
      this.fees = event.fees;
      this.tags = event.tags;
      this.maxParticipants = event.maxParticipants;
      this.fieldsRequired = event.fieldsRequired;
    });
  },
  methods: {
    saveEvent() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const updatedEvent = {
            id: this.id,
            eventName: this.eventName,
            description: this.description,
            duration: this.duration,
            location: this.location,
            fees: this.fees,
            tags: this.tags,
            maxParticipants: this.maxParticipants,
            fieldsRequired: this.fieldsRequired,
          };
          const user = this.$cookies.get(this.email);
          const index = user.events.indexOf(user.events.find(event => event.id === this.id));
          user.events.splice(index, 1, updatedEvent);
          this.$cookies.set(this.email, JSON.stringify(user));
          EventBus.$emit('show-success-snack', 'Event Updated!');
          EventBus.$emit('update-my-events');
          this.dialog = false;
        }
      });
    },
  },
};
</script>

