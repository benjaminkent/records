<template lang="pug">
  .max-w-md.m-auto.py-10
    .text-red(v-if="error") {{ error }}
    h3.font-mono.font-regular.text-3xl.mb-4 Add a new record
    form(action="" @submit.prevent="addRecord")
      .mb-6
        label.label(for="record_title") Title
        input.input(id="record_title" autofocus autocomplete="off" placeholder="Record Name" v-model="newRecord.title")
      .mb-6
        label.label(for="record_year") Year
        input.input(id="record_year" autofocus autocomplete="off" placeholder="Record Year" v-model="newRecord.year")
      .mb-6
        label.label(for="artist") Artist
        select.select(id="artist" v-model="newRecord.artist")
          option(disabled value="") Select an artist
          option(:value="artist.id" v-for="artist in artists" :key="artist.id") {{ artist.name }}
        span.pt-4
          p
            | Don't see an artist?
          router-link.text-grey-darker.underline(to="/artists")
            | Create one
      input.font-sans.font-bold.px-4.rounded.cursor-pointer.no-underline.bg-green.block.w-full.py-4.text-white.items-center.justify-center(type="submit" value="Add a Record")
    h3.border.border-grey-light.my-6
    ul.list-reset.mt-4
      li.py-4(v-for="record in records" :key="record.id" :record="record")
        .flex.items-center.justify-between.flex-wrap
          .flex-1.flex.justify-between.flex-wrap.pr-4
            span.block.font-mono.font-semibold.flex.items-center
              svg.fill-current.text-indigo.w-6.h-6.mr-2(viewbox="0 0 24 24" width="24" height="24")
                title record vinyl
                path(d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z")
              p {{ record.title }} $mdash; {{ record.year }}
            p.block.font-mono.font-semibold {{ getArtist(record) }}
          button.bg-transparent.text-sm.text-blue.border.border-blue.no-underline.font-bold.py-2.px-4.mr-2.rounded(@click.prevent="editRecord(record)")
            | Edit
          button.bg-transparent.text-sm.text-blue.border.border-blue.no-underline.font-bold.py-2.px-4.mr-2.rounded(@click.prevent="removeRecord(record)")
            | Delete
        div(v-if="record === editedRecord")
          form(action="" @submit.prevent="updateRecord(record)")
            .mb-6.p-4.bg-white.rounded.border.border-grey-light.mt-4
              .mb-6
                label.label Title
                input.input(v-model="record.title")
              .mb-6
                label.label Year
                input.input(v-model="record.year")
              .mb-6
                label.label Artist
                select.select(id="artist" v-model="record.artist")
                  option(:value="artist.id" v-for="artist in artists" :key="artist.id")
                    | {{ artist.name }}
              input.bg-transparent.text-sm.text-blue.border.border-blue.no-underline.font-bold.py-2.px-4.mr-2.rounded(type="submit" value="Update")
</template>

<script>
export default {
  name: "Records",
  data() {
    return {
      artists: [],
      records: [],
      newRecord: [],
      error: '',
      editedRecord: ''
    }
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/records')
        .then(response => { this.records = response.data })
        .catch(error => this.setError(error, "Something is afoot"))
      this.$http.secured.get('/api/v1/artists')
        .then(response => { this.artists = response.data })
        .catch(error => this.setError(error, "Something is afoot"))
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getArtist(record) {
      const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id)
      let artist
      recordArtistValues.forEach(e => {
        artist = e.name
      })
      return artist
    },
    addRecord() {
      const value = this.newRecord
      if(!value) {
        return
      }
      this.$http.secured.post('/api/v1/records/', { record: { title: this.newRecord.title, year: this.newRecord.year, artist_id: this.newRecord.artist } })
        .then(response => {
          this.records.push(response.data)
          this.newRecord = ''
        })
        .catch(error => this.setError(error, "Cannot create record"))
    },
    removeRecord(record) {
      this.$http.secured.delete(`/api/v1/records/${record.id}`)
        .then(response => {
          this.records.splice(this.records.indexOf(record), 1)
        })
        .catch(error => this.setError(error, "Cannot delete record"))
    },
    editRecord(record) {
      this.editedRecord = record
    },
    updateRecord(record) {
      this.editedRecord = ''
      this.$http.secured.patch(`/api/v1/records/${record.id}`, { record: { title: record.title, year: record.year, artist_id: record.artist } })
        .catch(error => this.setError(error, "Cannot update record"))
    }
  }
}
</script>
