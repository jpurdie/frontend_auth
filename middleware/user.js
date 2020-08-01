export default function({ store }) {
  // if (store.state.user === null || store.state.user.orgs === null) {
  return store.dispatch("user/fetchUser");
  // }
}
