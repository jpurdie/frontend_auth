// import { getExpFromCookie } from '~/util/auth'

export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse((resp) => {
    if (resp.data.token !== null || resp.data.token !== undefined) {
      $axios.setToken(resp.data.token, 'Bearer')
    }
  })

  //

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/login')
    }
  })
}
