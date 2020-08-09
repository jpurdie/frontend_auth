// export default ({ app }) => {
//   console.log("Inside set-profile");

//   if (
//     app.store.state.user !== null &&
//     app.store.state.user.selectedProfile !== null
//   ) {
//     console.log("Inside checkOrgMiddleware 2");

//     const profileCookie = app.$cookies.get("user.profile");
//     console.log("profileCookie", profileCookie);
//     if (profileCookie === undefined) {
//       app.router.push("/check-orgs");
//     }
//     console.log("app.store.state.user.selectedProfile.profileID", app.store.state.user.selectedProfile.profileID);

//     app.$cookies.set(
//       "user.profile",
//       app.store.state.user.selectedProfile.profileID,
//       {
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7
//         // sameSite: true
//         // httpOnly: true,
//         // secure: true
//       }
//     );
//   }
// };
