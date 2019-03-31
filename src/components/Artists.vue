<template lang="pug">
  .max-w-md.m-auto.py-10
    .text-red(v-if="error") {{ error }}
    h3.font-mono.font-regular.text-3xl.mb-4 Add a new artist
    form(action="" @submit.prevent="addArtist")
      .mb-6
        input.input(autofocus autocomplete="off" placeholder="Artist Name" v-model="newArtist.name")
      input.font-sans.font-bold.px-4.rounded.cursor-pointer.no-underline.bg-green.block.w-full.py-4.text-white.items-center.justify-center(type="submit" value="Add Artist")
    h3.border.border-grey-light.my-6
    ul.list-reset.mt-4
      li.py-4(v-for="artist in artists" :key="artist.id" :artist="artist")
        .flex.items-center.justify-between.flex-wrap
          span.block.flex-1.font-mono.font-semibold.flex.items-center
            svg.fill-current.text-indigo.w-6.h-6.mr-2(viewbox="0 0 20 20" width="20" height="20")
              title music artist
              path(d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z")
            | {{ artist.name }}
          button.bg-transparent.text-sm.text-blue.border.border-clue.no-underline.font-bold.py-2.px-4.mr-2.rounded(@click.prevent="editArtist(artist)")
            | Edit
          button.bg-transparent.text-sm.text-blue.border.border-clue.no-underline.font-bold.py-2.px-4.mr-2.rounded(@click.prevent="removeArtist(artist)")
            | Delete
        div(v-if="artist === editedArtist")
          form(action="" @submit.prevent="updateArtist(artist)")
            .mb-6.p-4.bg-white.rounded.border.border-grey-light.mt-4
              input.input(v-model="artist.name")
              input.my-2.bg-transparent.text-sm.text-blue.border.border-blue.no-underline.font-bold.py-2.px-4.rounded.cursor-pointer(type="submit" value="Update")
          
</template>

<script>
export default {
  name: "Artists",
  data() {
    return {
      artists: [],
      newArtist: [],
      error: '',
      editedArtist: ''
    }
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/")
    } else {
      this.$http.secured.get('/api/v1/artists')
        .then(response => { this.artists = response.data })
        .catch(error => this.setError(error, "Something is afoot"))
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addArtist() {
      const value = this.newArtist
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/artists', { artist: { name: this.newArtist.name } })
        .then(response => {
          this.artists.push(response.data)
          this.newArtist = ''
        })
        .catch(error => this.setError(error, 'Cannot create artist'))
    },
    editArtist(artist) {
      this.editedArtist = artist
    },
    updateArtist(artist) {
      this.editedArtist = ''
      this.$http.secured.patch(`/api/v1/artists/${artist.id}`, { artist: { title: artist.name } })
        .catch(error => this.setError(error, 'Cannot update artist'))
    }
  }
}
</script>

