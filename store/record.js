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
  }
}

export const getters = {}
