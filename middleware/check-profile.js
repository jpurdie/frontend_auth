export default ({ app, redirect }) => {
  console.log("Inside checkOrgMiddleware");

  const profileCookie = app.$cookies.get("user.profile");

  const selectedProfExists =
    app.store.state.user !== undefined &&
    app.store.state.user.selectedProfile !== undefined &&
    app.store.state.user.selectedProfile.organization !== undefined;

  const profileCookieExists = typeof profileCookie === "object" && profileCookie.profileID !== undefined;

  console.log("profileCookie", profileCookie);
  console.log("profileCookieExists", profileCookieExists);
  console.log("selectedProfExists", selectedProfExists);

  if (!profileCookieExists && selectedProfExists) {
    console.log("cookie is empty. Selected Profile exists. Set new cookie.");

    app.$cookies.set("user.profile", app.store.state.user.selectedProfile, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: true
    });

    return;
  }

  if (!profileCookieExists && !selectedProfExists) {
    console.log("cookie is empty. Selected Profile does not exist. redirect to check-org ");
    const route = "/check-orgs";
    return redirect(route);
  }

  if (profileCookieExists && selectedProfExists) {
    console.log("cookie is not empty. Selected Profile exists. dont do anything.");
    return;
  }

  if (profileCookieExists && !selectedProfExists) {
    console.log("cookie is not empty. Selected Profile does not exist. set selected profile");
    const selectedObj = profileCookie;
    app.store.state.user.selectedProfile = selectedObj;
  }

  console.log("shouldnt make it here");
};
