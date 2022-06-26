export const state = () => ({
  users: [],
})

export const mutations = {}

export const actions = {
  getListUsers() {
    try {
      const response = this.$getUsers()
      return response
    } catch (errors) {
      // Exceptions
      this.app.wait.end('loadingUser')

      return 1
    }
  },
  registerUser(vueContext, payload) {
    try {
      console.log(payload, 'payload');
      const email = payload.email
      const name = payload.name
      const password = payload.password
      const response = this.$addUser({ email, name, password }) 
      return response
    } catch (errors) {

    }
  },
  deleteUser(vueContext, payload) {
    try {
      const id = payload
      const response = this.$deleteUser(id) 
      return response
    } catch (errors) {

    }
  },
  activeUser(vueContext, payload) {
    try {
      const id = payload
      const response = this.$activeUser(id)
      return response
    } catch (error) {
      
    }
  }
}

export const getters = {}
