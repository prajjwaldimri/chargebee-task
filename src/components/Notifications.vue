<template lang="pug">
  v-container(fluid)
    h1 Your notifications

    v-layout(column).pt-5
      v-card(v-for="notification in notifications").pa-2
        v-card-title(primary-title)
          h3.title.font-weight-regular {{notification}}
</template>

<script>
export default {
  data() {
    return {
      user: '',
      notifications: [],
    };
  },
  mounted() {
    this.user = this.$cookies.get(this.$session.get('authenticatedUser'));
    // Cookies are added to the bottom so reverse the array to get newer cookies above.
    this.notifications = this.user.notifications.reverse();
  },
};
</script>

