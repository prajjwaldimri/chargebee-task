<template lang="pug">
  v-app
    v-navigation-drawer(dark permanent clipped app)
      v-list
        v-list-tile(@click="")
          v-list-tile-action
            v-icon event
          v-list-tile-content
            v-list-tile-title All Events

        v-list-tile(@click="$router.push('myEvents')")
          v-list-tile-action
            v-icon event
          v-list-tile-content
            v-list-tile-title My Events
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
export default {
  data() {
    return {
      email: '',
    };
  },
  mounted() {
    // Authentication Check
    if (!this.$cookies.isKey('authenticatedUser')) {
      this.$router.push('/');
    }
    this.email = this.$cookies.get('authenticatedUser');
  },
};
</script>

