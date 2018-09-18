<template lang="pug">
  v-container(fluid grid-list-lg)
    h1.headline All Events

    v-layout(row wrap).pt-5
      v-flex(sm12 md6 v-for="event in events" v-if="events")
        v-card
          v-card-title(primary-title).orange.darken-4.white--text
            h3.title.mb-0 {{event.eventName}}
          v-card-text.px-4.py-4
            v-layout(column)
              v-flex.py-3
                v-layout(row wrap)
                  v-flex(md6)
                    h4.title Description:
                  v-flex(md6)
                    h4.title.font-weight-regular {{event.description}}
              v-flex.py-3
                v-layout(row wrap)
                  v-flex(md6)
                    h4.title Duration
                  v-flex(md6)
                    h4.title.font-weight-regular {{event.duration}}
              v-flex.py-3
                v-layout(row wrap)
                  v-flex(md6)
                    h4.title Fee:
                  v-flex(md6)
                    h4.title.font-weight-regular {{event.fees}}
              v-flex.py-3
                v-layout(row wrap)
                  v-flex(md6)
                    h4.title Location:
                  v-flex(md6)
                    h4.title.font-weight-regular {{event.location}}
              v-flex.py-3
                v-layout(row wrap)
                  v-flex(md6)
                    h4.title Tags:
                  v-flex(md6)
                    h4.title.font-weight-regular {{event.tags}}
          v-card-actions
            v-spacer
            v-btn(color="success" @click="register(event.participants[0], event.id)"
             v-if="event.participants.indexOf(currentUser) < 0")
              | Register For Event
            v-btn(disabled v-else) Already Registered
</template>

<script>
import { EventBus } from '../event-bus';

export default {
  data() {
    return {
      events: [],
      currentUser: '',
    };
  },
  mounted() {
    this.currentUser = this.$session.get('authenticatedUser');
    this.getEvents();
  },
  methods: {
    register(userEmail, eventId) {
      const user = this.$cookies.get(userEmail);

      const index = user.events.indexOf(user.events.find(event => event.id === eventId));
      user.events[index].participants.push(this.currentUser);
      // Check for duplicates
      user.events[index].participants = Array.from(new Set(user.events[index].participants));
      this.$cookies.set(userEmail, JSON.stringify(user));
      this.getEvents();

      EventBus.$emit('show-success-snack', 'Successfully registered');
    },
    getEvents() {
      const users = JSON.parse(this.$cookies.get('users'));
      // Get All Events from All Users
      this.events = [];
      users.forEach((user) => {
        const { events } = this.$cookies.get(user);
        if (events) {
          events.forEach((event) => {
            this.events.push(event);
          });
        }
      });
    },
  },
};
</script>

