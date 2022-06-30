export const state = () => ({
  records: [],
})

export const mutations = {}

export const actions = {
  getRecords() {
    try {
      const response = this.$getRecords()
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')
      return 1
    }
  },
  deleteRecord(vueContext, payload) {
    try {
      const id = payload
      const response = this.$deleteRecord(id) 
      return response
    } catch (errors) {

    }
  },
  addRecord(vueContext, payload) {
    try {
      const file = payload.file
      const response = this.$addRecord(file)
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  }
}

export const getters = {}
