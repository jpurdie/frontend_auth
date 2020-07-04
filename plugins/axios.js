export default function({ $axios, store, redirect }) {
  $axios.onRequest(request => {
    const token = store.$auth.token;
    if (token !== undefined && token !== null) {
      request.headers.common.Authorization = token;
    }

    return request;
  });

  $axios.onResponse(response => {
    // TODO: If token expires, perform a silent refresh

    return response;
  });

  $axios.onError(error => {
    if (error.response) {
      const code = parseInt(error.response.status);
      if (code === 401) {
        return redirect("/");
      } else if (code >= 500) {
        // TODO: Handle 500 errors in global
      }
    } else if (error.request) {
      // client never received a response, or request never left
      store.dispatch("updateOverlay", false);
      return redirect("/error");
    } else {
      // anything else
      console.error("error", error);
      return redirect("/error");
    }
  });
}
