<template lang="pug">
  v-container.full-width-vertical-center-flex
    v-layout(row)
      v-flex(sm12 md6 offset-md3)
        v-card
          v-tabs(color="#ff6c36" dark fixed-tabs slider-color="white")
            v-tab(ripple :key="1")
              h4.title Login
            v-tab-item(:key="1")

              form.pa-5
                v-text-field(v-validate="'required|email'" v-model="email"
                :error-messages="errors.collect('email')" label="E-Mail" data-vv-name="email")
                v-text-field(v-validate="'required|min:8'" v-model="password"
                :error-messages="errors.collect('password')" label="Password"
                 data-vv-name="password" type="password")

                v-btn(@click="login" color="primary").mt-3 Login
                v-btn(@click="clear").mt-3 Clear

            v-tab(ripple :key="2")
              h4.title Register
            v-tab-item(:key="2")
              form.pa-5
                v-text-field(v-validate="'required|email'" v-model="email"
                :error-messages="errors.collect('email')" label="E-Mail" data-vv-name="email")
                v-text-field(v-validate="'required|min:8'" v-model="password"
                :error-messages="errors.collect('password')" label="Password"
                 data-vv-name="password" type="password")

                v-btn(@click="register" color="primary").mt-3 Create your Account
                v-btn(@click="clear").mt-3 Clear
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
      password: '',
    };
  },
  methods: {
    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.$cookies.get(this.email)) {
            const dbPass = this.$cookies.get(this.email);
            // Should use bcrypt here
            if (this.password === dbPass) {
              this.$cookies.set('authenticatedUser', this.email);
              this.$router.push('/dashboard/myEvents');
            } else {
              EventBus.$emit('show-error-snack', 'Wrong username or password');
            }
          } else {
            EventBus.$emit('show-error-snack', 'Account does not exist. Please register!');
          }
        }
      });
    },
    register() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (!this.$cookies.get(this.email)) {
            // Simulating cookies as remote Database
            this.$cookies.set(this.email, this.password);
            this.$cookies.set('authenticatedUser', this.email);
            this.$router.push('/dashboard/myEvents');
          } else {
            EventBus.$emit('show-error-snack', 'Account already exists!');
          }
        }
      });
    },
    clear() {
      this.email = '';
      this.password = '';
    },
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

