<template lang="pug">
  v-container.full-width-vertical-center-flex
    v-layout(row)
      v-flex(sm12 md6 offset-md3)
        v-card
          v-tabs(color="#ff6c36" dark fixed-tabs slider-color="white")
            v-tab(ripple :key="1")
              h4.title Login
            v-tab-item(:key="1")
              v-card(flat)
                v-card-text Login

            v-tab(ripple :key="1")
              h4.title Register
            v-tab-item(:key="1")
              v-card(flat)
                v-card-text Register
</template>

<script>
export default {
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.full-width-vertical-center-flex {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>

