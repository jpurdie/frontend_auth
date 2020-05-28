export default function({ $axios, store, redirect }) {
  console.log("AXIOS PLUGIN LOADED");

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
      console.log("code", code);
      if (code === 401) {
        return redirect("/");
      } else if (code >= 500) {
        // TODO: Handle 500 errors in global
      }
    }
  });
}
