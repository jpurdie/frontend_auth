export default function({ $axios, store, redirect }) {
  $axios.onRequest(request => {
    const token = store.$auth.token;
    if (token !== undefined && token !== null) {
      request.headers.common.Authorization = token;
    }

    const selectedProfExists =
      store.state.user !== undefined &&
      store.state.user.selectedProfile !== undefined &&
      store.state.user.selectedProfile.organization !== undefined; // making sure there's a selected org
    if (selectedProfExists && request.baseURL.includes("api.vitae.com")) {
      // append the org ID to the url param as a query string
      request.url = request.url + "?org_id=" + store.state.user.selectedProfile.organization.organizationID;
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
      } else if (code === 404) {
        redirect("/404");
      } else if (code >= 500) {
        redirect("/500");
      }
    } else if (error.request) {
      console.error("error.request", error.request);
      redirect("/500");
    } else {
      // anything else
      console.error("error", error);
      redirect("/500");
    }
  });
}
