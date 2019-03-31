<template lang="pug">
  .max-w-sm.m-auto.my-8
    .border.p-10.border-grey-light.shadow.rounded
      h3.text-2xl.mb-6.text-grey-darkest
        | Sign Up
      form(@submit.prevent="signup")
        .text-red(v-if="error")
          | {{ error }}
        .mb-6
          label.label(for="email")
            | Email Address
          input.input(type="email" v-model="email" id="email" placeholder="name@domain.com")
        .mb-6
          label.label(for="password")
            | Password
          input.input(type="password" v-model="password" id="password" placeholder="Create Password")
        .mb-6
          label.label(for="password_confirmation")
            | Password Confirmation
          input.input(type="password" v-model="password_confirmation" id="password_confirmation" placeholder="Confirm Password")
        button.font-sans.font-bold.px-4.rounded.cursor-pointer.no-underline.bg-green.block.w-full.py-4.text-white.items-center.justify-center(type="submit")
          | Sign Up
        .my-4
          router-link(to="/")
            | Sign in
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created() {
    this.checkedSignedIn()
  },
  updated() {
    this.checkedSignedIn()
  },
  methods: {
    signup() {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.$router.replace('/records')
    },
    signupFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something is afoot'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/records')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #131313;
}

a:hover {
  color: #136f63;
}

button:hover {
  background-color: #136f63;
}

label {
  margin-right: 10px;
}
</style>

