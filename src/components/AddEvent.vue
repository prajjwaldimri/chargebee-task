<template lang="pug">
  v-dialog(v-model="dialog" width="500" persistent)
    v-card
      v-card-title.headline(primary-title).blue.white--text Add an Event
      v-card-text
        form
          v-text-field(v-validate="'required|min:4'" v-model="eventName" prepend-icon="event"
          :error-messages="errors.collect('eventName')" label="Event Name" data-vv-name="eventName")

          v-text-field(v-validate="'required|min:4'" v-model="description" prepend-icon="event_note"
          :error-messages="errors.collect('description')" label="Description"
            data-vv-name="description" textarea)

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
          :error-messages="errors.collect('tags')" label="Tags"
            data-vv-name="tags")

          v-text-field(v-validate="'required|numeric'" v-model="maxParticipants"
          prepend-icon="event_seat"
          :error-messages="errors.collect('maxParticipants')" label="Maximum Participants"
            data-vv-name="maxParticipants")

      v-divider

      v-card-actions
        v-spacer
        v-btn(color="primary")
          v-icon.pr-2 save
          span Save
        v-btn(@click="dialog = false")
          v-icon.pr-2 close
          span close
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  data() {
    return {
      dialog: false,
      eventName: '',
      description: '',
      duration: '',
      location: '',
      fees: '',
      tags: '',
      maxParticipants: 0,
      fieldsRequired: [],
    };
  },
  mounted() {
    EventBus.$on('show-add-dialog', () => {
      this.dialog = true;
    });
  },
};
</script>
