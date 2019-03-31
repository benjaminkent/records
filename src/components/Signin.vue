<template lang="pug">
  .signin-container.max-w-sm.m-auto.my-8
    .border.p-10.border-grey-light.shadow.rounded
      h3.text-2xl.mb-6.text-grey-darkest
        | Sign In
      form(@submit.prevent="signin")
        .text-red(v-if="error")
          | {{ error }}
        .mb-6
          label.label(for="email")
            | E-mail Address
          input.input(type="email" v-model="email" id="email" placeholder="name@domain.com")
        .mb-6
          label.label(for="password")
            | Password
          input.input(type="password" v-model="password" id="password" placeholder="Password")
        button.font-sans.font-bold.px-4.rounded.cursor-pointer.no-underline.bg-green.block.w-full.py-4.text-white.items-center.justify-center(type="submit")
          | Sign In
        .my-4
          router-link.link-grey(to="/signup")
            | Sign up
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    signin() {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('records')
    },
    signinFailed(error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('records')
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

