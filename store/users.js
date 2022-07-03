export const state = () => ({
  users: [],
})

export const mutations = {}

export const actions = {
  getListUsers() {
    try {
      const response = this.$getUsers()
      this.$router.app.$notify({
        group: 'default',
        type: 'success',
        text : 'get list users success'
      })
      return response
    } catch (errors) {
      // Exceptions
      this.$router.app.$notify({
        group: 'default',
        type: 'error',
        text : 'get list users failed'
      })
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
      this.$router.app.$notify({
        group: 'default',
        type: 'success',
        text : 'register user success'
      })
      return response
    } catch (errors) {
      this.$router.app.$notify({
        group: 'default',
        type: 'error',
        text : 'register user failed'
      })

    }
  },
  deleteUser(vueContext, payload) {
    try {
      const id = payload
      const response = this.$deleteUser(id) 
      this.$router.app.$notify({
        group: 'default',
        type: 'success',
        text : 'delete user success'
      })
      return response
    } catch (errors) {
      this.$router.app.$notify({
        group: 'default',
        type: 'error',
        text : 'delete user failed'
      })
    }
  },
  activeUser(vueContext, payload) {
    try {
      const id = payload
      const response = this.$activeUser(id)
      this.$router.app.$notify({
        group: 'default',
        type: 'success',
        text : 'change active user success'
      })
      return response
    } catch (error) {
      this.$router.app.$notify({
        group: 'default',
        type: 'error',
        text : 'change active user failed'
      })
    }
  }
}

export const getters = {}
