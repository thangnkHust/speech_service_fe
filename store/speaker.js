export const state = () => ({
  speakers: [],
})

export const mutations = {}

export const actions = {
  getSpeakers() {
    try {
      const response = this.$getSpeakers()
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  },
  deleteSpeaker(vueContext, payload) {
    try {
      const id = payload
      const response = this.$deleteSpeaker(id) 
      return response
    } catch (errors) {

    }
  },
  getAudiosBySpeaker(vueContext, payload) {
    try {
      const id = payload
      const response = this.$getAudiosBySpeaker(id)
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  },

  addAudio(vueContext, payload) {
    try {
      const id = payload.id
      const file = payload.file
      const response = this.$addAudio(id, file)
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  },

  getAudioSource(vueContext, payload) {
    try {
      const speakerId = payload.speakerId
      const audioId = payload.audioId
      const response = this.$getAudioSource(speakerId, audioId)
      return response
    } catch (error) {
       // Exceptions
       this.app.wait.end('loadingUser')

       return 1
    }
  },

  deleteAudio(vueContext, payload) {
    try {
      const speakerId = payload.speakerId
      const audioId = payload.audioId
      const response = this.$deleteAudio(speakerId, audioId) 
      return response
    } catch (errors) {

    }
  },

}

export const getters = {}
