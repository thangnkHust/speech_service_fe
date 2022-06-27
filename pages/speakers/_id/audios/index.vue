<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-file-input v-model="audioFile" label="Audio file input" outlined dense></v-file-input>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" dark class="mb-2" @click="addAudio">
          Add Audio
        </v-btn>
      </v-col>
    </v-row>
    <div v-for="(audio, idx) in audios" :key="idx" class="mb-4">
      <p class="mb-0">{{ audio.name }}</p>
      <audio controls>
        <source :src="audio.path" type="audio/ogg" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: null,
    audios: [],
    audioFile: null,
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
      if (!this.audioFile) return
      this.$store.dispatch("speaker/addAudio", {id: this.id, file: this.audioFile}).then(res => {
        this.audioFile = null
        this.getAudios();
      })
    }
  }
};
</script>

<style></style>
