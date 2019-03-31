<template lang="pug">
  header.bg-grey-lighter.py-4
    .container.m-auto.flex.flex-wrap.items-center.justify-end
      .flex-1.flex.items-center
        svg.fill-current.text-indigo(viewBox="0 0 24 24" width="24" height="24")
          title
            | record vinyl
          path(d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z")
        a.uppercase.text-sm.font-mono.pl-4.font-semibold.no-underline.text-indigo-dark(href="/")
          | Record Store
      .links-container
        router-link.link-grey.px-2.no-underline(to="/" v-if="!signedIn()") Sign in
        router-link.link-grey.px-2.no-underline(to="/signup" v-if="!signedIn()") Sign up
        router-link.link-grey.px-2.no-underline(to="/records" v-if="signedIn()") Records
        router-link.link-grey.px-2.no-underline(to="/artists" v-if="signedIn()") Artists
        a.link-grey.px-2.no-underline(href="#" @click.prevent="signOut" v-if="signedIn()") Sign Out
</template>

<script>
export default {
  name: "Header",
  created() {
    this.signedIn()
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn() {
      return localStorage.signedIn
    },
    signOut() {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>

