<template lang="pug">
  v-dialog(v-model="dialog" width="500" persistent)
    v-card(v-if="event")
      v-card-title.headline(primary-title).blue.white--text Add an Event
      v-card-text
        form
          v-text-field(v-for="(field, index) in event.fieldsRequired" v-validate="'required|min:4'"
          v-model="dynamicFields[index]" prepend-icon="event"
          :error-messages="errors.collect(field)" :label="field" :data-vv-name="field")

      v-card-actions
        v-spacer
        v-btn(color="primary" @click="register")
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
      event: '',
      dialog: false,
      dynamicFields: [],
      currentUser: '',
    };
  },
  mounted() {
    EventBus.$on('register-for-event', (event) => {
      this.event = event;
      this.dialog = true;
      this.currentUser = this.$session.get('authenticatedUser');
    });
  },
  methods: {
    register() {
      const userEmail = this.event.participants[0];
      const user = this.$cookies.get(userEmail);

      const event = user.events.find(item => item.id === this.event.id);
      // If event creator has not specified any fields to be filled on registration
      // directly register user
      const index = user.events.indexOf(event);
      user.events[index].participants.push(this.currentUser);
      // Check for duplicates
      user.events[index].participants = Array.from(new Set(user.events[index].participants));
      let message = '';
      this.event.fieldsRequired.forEach((field, index1) => {
        message += `-------${field} : ${this.dynamicFields[index1]}-------`;
      });
      if (!user.notifications) {
        user.notifications = [];
      }
      user.notifications.push(`${this.currentUser} registered for your event with the details: ${message}`);
      this.$cookies.set(userEmail, JSON.stringify(user));
      this.dialog = false;

      EventBus.$emit('show-success-snack', 'Successfully registered');
      EventBus.$emit('refresh-all-events');
    },
  },
};
</script>

