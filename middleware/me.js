export default function({ store }) {
  if (
    store.state.user.me === null ||
    store.state.user.me === undefined ||
    store.state.user.me.firstName === null
  ) {
    return store.dispatch("user/fetchMe");
  }
}
