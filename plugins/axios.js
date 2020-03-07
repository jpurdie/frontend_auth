export default function({ $axios, store, redirect }) {
  console.log("AXIOS PLUGIN LOADED");

  $axios.onRequest(request => {
    console.log("[ REQUEST ]" + request.url);

    const token = store.$auth.getToken("auth0");
    if (token !== undefined && token !== null) {
      request.headers.common.Authorization = token;
    }

    return request;
  });

  $axios.onResponse(response => {
    console.log("[ RESPONSE ]" + response.request.responseURL, response);
    // TODO: If token expires, perform a silent refresh

    return response;
  });

  $axios.onError(error => {
    console.error("[ ERROR ]", error);
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      store.state.sessionStorage.authUser = null;
      return redirect("/");
    }

    return error;
  });
}
