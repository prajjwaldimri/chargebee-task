<template lang="pug">
  v-app
    v-navigation-drawer(dark permanent clipped app)
      v-list(two-line)
        v-list-tile(@click="$router.push('myEvents')")
          v-list-tile-action
            v-icon event
          v-list-tile-content
            v-list-tile-title My Events

        v-list-tile(@click="$router.push('allEvents')")
          v-list-tile-action
            v-icon event_note
          v-list-tile-content
            v-list-tile-title All Events

        v-list-tile(@click="$router.push('notifications')")
          v-list-tile-action
            v-icon notifications
          v-list-tile-content
            v-list-tile-title Notifications

    v-toolbar(dark prominent app fixed).pl-0
      v-toolbar-side-icon
      v-toolbar-title Events Dashboard
      v-spacer
      v-toolbar-items.hidden-xs-only
        v-btn(flat)
          span.subheading.text-lowercase {{email}}


    v-content
      v-container(fluid)
        transition(name="fade-transition" mode="out-in" appear)
          router-view


</template>

<script>
import { EventBus } from '../event-bus';

export default {
  data() {
    return {
      email: '',
    };
  },
  mounted() {
    // Authentication Check
    if (!this.$session.exists('authenticatedUser')) {
      EventBus.$emit('show-info-snack', 'Please Login First!');
      this.$router.push('/');
    }
    this.email = this.$session.get('authenticatedUser');
    if (!this.$cookies.isKey(this.email)) {
      this.$session.remove('authenticatedUser');
      EventBus.$emit('show-info-snack', 'Please Login First!');
      this.$router.push('/');
    }
  },
};
</script>

