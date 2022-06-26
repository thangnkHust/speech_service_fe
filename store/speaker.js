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
  getAudio() {
    try {
      const response = this.$getAudio()
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  }

}

export const getters = {}
