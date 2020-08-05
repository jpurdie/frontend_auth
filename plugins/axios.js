export default function({ $axios, store }) {
  $axios.onRequest(request => {
    const token = store.$auth.token;
    if (token !== undefined && token !== null) {
      request.headers.common.Authorization = token;
    }

    if (
      store.state.user !== undefined &&
      store.state.user.me !== undefined &&
      store.state.user.me.profiles !== undefined
    ) {
      for (let i = 0; i < store.state.user.me.profiles.length; i++) {
        if (store.state.user.me.profiles[i].selected === true) {
          request.url =
            request.url +
            "?org_id=" +
            store.state.user.me.profiles[i].organization.organizationID;
          break;
        }
      }
    }

    return request;
  });

  $axios.onResponse(response => {
    return response;
  });

  $axios.onError(error => {
    if (error.response) {
      const code = parseInt(error.response.status);
      if (code === 401) {
        console.error("handle 401");
      } else if (code >= 500) {
        console.error("handle 500");
      }
    } else if (error.request) {
      console.error("handle error.request");
      // client never received a response, or request never left
      store.dispatch("updateOverlay", false);
    } else {
      // anything else
      console.error("error", error);
    }
  });
}
