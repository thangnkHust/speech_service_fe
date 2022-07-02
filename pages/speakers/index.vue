<template>
  <v-data-table :headers="headers" :items="speakers" class="elevation-1" disable-sort>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List speakers</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2"
        >
          Add Speaker
        </v-btn>
        <DeleteSpeakerDialog
          v-model="openDeleteDialog"
          @deleteSpeaker="deleteSpeaker"
        ></DeleteSpeakerDialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="redirectAudios(item)">
        mdi-information
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DeleteSpeakerDialog from "~/components/speaker/DeleteSpeakerDialog";
export default {
  components: {
    DeleteSpeakerDialog
  },
  data: () => ({
    speakers: [],
    headers: [
      { text: "Id", value: "id" },
      {
        text: "Name",
        value: "name"
      },
      { text: "User", value: "user" },
      { text: "Action", value: "actions" }
    ],
    openDeleteDialog: false,
    speaker: {},
    audio: null
  }),
  created() {
    this.getSpeakers();
    // this.getAudio();
  },

  methods: {
    getSpeakers() {
      this.$store.dispatch("speaker/getSpeakers").then(res => {
        this.speakers = res.data;
      });
    },
    deleteItem(item) {
      this.speaker = item;
      this.openDeleteDialog = true;
    },
    async deleteSpeaker() {
      const res = await this.$store.dispatch(
        "speaker/deleteSpeaker",
        this.speaker.id
      );
      if (res) {
        this.getSpeakers()
        this.openDeleteDialog = false
      }
    },
    redirectAudios(item) {
      console.log('speakers/' + item.id + '/audios');
      this.$router.push('speakers/' + item.id + '/audios')
    }
  }
};
</script>

<style></style>
