import APIs from '~/assets/configurations/API_Config'
import uniqid from 'uniqid'
import Cookies from 'js-cookie'

// Inject APIs
export default (context, inject) => {
  const channel = APIs.channel
  // context.app.$axios.setHeader('token_key', Cookies.get('token'))
  // LOGIN
  inject('login', async ({ email, password }) => {
    const response = await context.app.$axios({
      url: APIs.login.url,
      method: APIs.login.method,
      headers: {},
      data: {
        email,
        password
      }
    })
    return response
  })

  inject('getUsers', async ()  => {
    const response = await context.app.$axios({
      url: APIs.getUsers.url,
      method: APIs.getUsers.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      },
      params: {}
    })
    return response
  })

  inject('addUser', async ({ email, password, name }) => {
    const response = await context.app.$axios({
      url: APIs.addUser.url,
      method: APIs.addUser.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      },
      data: {
        email,
        password,
        name
      }
    })
    return response
  })

    // UPDATE USER
  inject('updateUser', async item => {
      //console.log(item)
      let transid = uniqid()
      const response = await context.app.$axios({
        url: APIs.updateUser.url,
        method: APIs.updateUser.method,
        headers: {
          token_key: Cookies.get('token')
        },
        data: {
          channel,
          transid,
          user_id: item.user_id,
          full_name: item.full_name, // item.full_name- errro
          birthday: item.birthday,
          email: item.email,
          phone_int: item.phone_number,
          mobile_int: item.mobile_number, //item.mobile_number,//khong dc de trong
          sex: item.sex,
          address: item.address,
          unit: item.unit,
          status: parseInt(item.status),
          list_group: item.list_group,
          update_by: Cookies.get('username'),
          schedule_id: item.schedule_id
        }
      })
      return response
    })
  
  inject('deleteUser', async (id) => {
    const response = await context.app.$axios({
      url: APIs.deleteUser.url + id,
      method: APIs.deleteUser.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
    return response
  })

  inject('activeUser', async (id) => {
    const response = await context.app.$axios({
      url: '/admin/users/' + id + '/active',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
    return response
  })

  inject('getSpeakers', async ()  => {
    const response = await context.app.$axios({
      url: APIs.getSpeakers.url,
      method: APIs.getSpeakers.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      },
      params: {}
    })
    return response
  })

  inject('deleteSpeaker', async (id) => {
    const response = await context.app.$axios({
      url: APIs.deleteSpeaker.url + id,
      method: APIs.deleteSpeaker.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
    return response
  })

  inject('getAudio', async ()  => {
    const response = await context.app.$axios({
      url: APIs.getAudio.url,
      method: APIs.getAudio.method,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      },
      params: {}
    })
    return response
  })

}
