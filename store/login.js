import Cookies from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'
export const state = () => ({
  email: {
    errors: [],
    value: ''
  },
  password: {
    errors: [],
    value: ''
  }
})

export const mutations = {
  setUsername(state, payload) {
    state.email = {
      ...state.email,
      value: payload,
      errors: []
    }
  },
  unsetItem(state) {
    state.email.value = ''
    state.password.value = ''
  },
  setPassword(state, payload) {
    state.password = {
      ...state.password,
      value: payload,
      errors: []
    }
  },
  usernameHasErrors(state, payload) {
    state.email = {
      ...state.email,
      errors: [payload]
    }
  },
  passwordHasErrors(state, payload) {
    state.password = {
      ...state.password,
      errors: [payload]
    }
  },
  clearErrors(state, payload) {
    state.email = {
      ...state.email,
      errors: []
    }
    state.password = {
      ...state.password,
      errors: []
    }
  }
}

export const actions = {
  isAuthenticated(vueContext, req) {
    if (req) {
      let token
      try {
        token = req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('token='))
          .split('=')[1]
      } catch (e) {
        token = ''
      }
      return token
    } else {
      const token =
        Cookies.get('token') !== undefined ? Cookies.get('token') : ''
      return token
    }
  },

  setUsername(vueContext, payload) {
    vueContext.commit('setUsername', payload)
  },

  setPassword(vueContext, payload) {
    vueContext.commit('setPassword', payload)
  },
  // async getAccessPages(vueContext, group_id) {
  //   let res_group_info = await this.$getGroupUser(group_id)
  //   let group_error_code = res_group_info.data.error.code
  //   if (group_error_code === APIs.responses.OK.code) {
  //     //chua tat cac trang o day
  //     let data_group = res_group_info.data.data.group_page_infos
  //     let list_page = []
  //     let count = 0
  //     data_group.forEach(p => {
  //       count += 1
  //       if (1) {
  //         let temp = list_page.find(i => i.page_id === p.page_id)
  //         if (temp == undefined) {
  //           //ko tim thay page thi moi them vao
  //           list_page.push({
  //             ...p
  //           })
  //         } else {
  //           let index = list_page.indexOf(temp)
  //           list_page[index].role_id = temp.role_id + ',' + p.role_id
  //         }
  //       } else {
  //         //console.log(p)
  //       }
  //     })
  //     vueContext.dispatch('app/GetRole')
  //     //luu cac page nay +role kem voi vao session page
  //     //page se co url va role cua tung page do

  //     // Cookies.set('list_page', list_page)
  //     //localStorage.setItem('list_page', JSON.stringify(list_page))
  //     // console.log(Cookies.get('list_page'), list_page, count, 'GET COOKIE')
  //   }
  // },
  submit(vueContext, payload) {
    const email = vueContext.state.email.value
    const password = vueContext.state.password.value
    if (email.indexOf(' ') >= 0) {
      vueContext.commit('usernameHasErrors', 'T??n ng?????i d??ng kh??ng h???p l???.')
      this.app.wait.end('logging')
      return
    }
    vueContext.commit('clearErrors')
    // Start calling API
    this.$login({
      email,
      password,
    })
      .then(response => {
        let errorCode = response.status
        let data = response.data
        if (errorCode === APIs.responses.OK.code && data.admin) {
          // Succeed
          
          Cookies.set('token', data.token)
          Cookies.set('email', email)
          this.$router.push('/users')
          this.$router.app.$notify({
            group: 'login',
            type: 'success',
            text : 'success'
          })

        } else if (
          errorCode === APIs.login.responses.CREDENTIALS_INVALID.code
        ) {
          // Wrong credentials
          vueContext.commit(
            'usernameHasErrors',
            'Email ng?????i d??ng kh??ng h???p l??? ho???c kh??ng t???n t???i'
          )
          vueContext.commit(
            'passwordHasErrors',
            'Email ng?????i d??ng kh??ng h???p l??? ho???c kh??ng t???n t???i'
          )
        } else {
          // Other errors
          console.log('X???y ra l???i khi ????ng nh???p: ', response)
          this.$router.app.$notify({
            group: 'login',
            type: 'warn',
            text: APIs.responses[errorCode].message
          })
        }
        this.app.wait.end('logging')
      })
      .catch(errors => {
        // Exceptions
        this.app.wait.end('logging')
        let response = errors.response
        let request = errors.request
        console.log('Kh??ng th??? k???t n???i ?????n server:', {
          response,
          request,
          errors
        })
        this.$router.app.$notify({
          group: 'login',
          type: 'error',
          text: 'Kh??ng th??? k???t n???i ?????n server'
        })
      })
  }
}

export const getters = {
  // getUsername(state) {
  //   return state.username
  // },
  // getPassword(state) {
  //   return state.password
  // }
}
