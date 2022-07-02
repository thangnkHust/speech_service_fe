<template>
  <v-data-table
    :headers="headers"
    :items="audios"
    class="elevation-1"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List records</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <DeleteAudioDialog
          v-model="openDeleteDialog"
          @deleteAudio="deleteAudio"
        ></DeleteAudioDialog>
        <div class="d-flex">
          <div class="mr-2" style="width: 180px">
            <v-file-input
              v-model="audioFile"
              label="Audio file input"
              outlined
              dense
            ></v-file-input>
          </div>
          <v-btn color="primary" dark class="mb-2" @click="addAudio">
            Add Audio
          </v-btn>
        </div>
      </v-toolbar>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <span>{{ getResultPath(item.path) }}</span>
    </template>
    <template v-slot:[`item.path`]="{ item }">
      <audio controls>
        <source :src="item.path" type="audio/ogg" />
      </audio>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="ma-2" small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DeleteAudioDialog from "~/components/audio/DeleteAudioDialog";
export default {
  components: {
    DeleteAudioDialog
  },
  data: () => ({
    id: null,
    audios: [],
    audioFile: null,
    audioSource: null,
    headers: [
      { text: "Id", value: "id" },
      {
        text: "Name",
        value: "name"
      },
      { text: "Audio", value: "path" },
      { text: "Action", value: "actions" }
    ],
    openDeleteDialog: false,
    audioInfo: {}
  }),
  mounted() {
    this.id = this.$route.params.id;
    this.getAudios();
  },
  methods: {
    getAudios() {
      this.$store.dispatch("speaker/getAudiosBySpeaker", this.id).then(res => {
        this.audios = res.data;
      });
    },
    addAudio() {
      if (!this.audioFile) return;
      this.$store
        .dispatch("speaker/addAudio", { id: this.id, file: this.audioFile })
        .then(res => {
          this.audioFile = null;
          this.getAudios();
        });
    },
    getAudioSource(audio) {
      const speakerId = this.$route.params.id;
      const audioId = audio.id;
      this.$store
        .dispatch("speaker/getAudioSource", { speakerId, audioId })
        .then(res => {
          console.log(res.data);
          console.log(res.data.blob(), "res.blob()");
          this.audioSource = res.blob();
        });
    },
    getResultPath(resultPath) {
      return resultPath?.replace(/^.*[\\\/]/, "");
    },
    deleteItem(item) {
      this.audioInfo = item
      this.openDeleteDialog = true
    },
    async deleteAudio() {
      const speakerId = this.$route.params.id
      const audioId = this.audioInfo.id
      const res = await this.$store.dispatch(
        "speaker/deleteAudio",
        { speakerId, audioId }
      );
      if (res) {
        this.getAudios();
        this.openDeleteDialog = false;
      }
    }
  }
};
</script>

<style></style>
