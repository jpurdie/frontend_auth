export default function({ app }) {
  const iDontExist =
    app.store.state.user.me === null ||
    app.store.state.user.me === undefined ||
    app.store.state.user.me.firstName === null ||
    app.store.state.user.me.firstName === undefined;
  if (iDontExist) {
    console.log('calling fetchme');
    return app.store.dispatch('user/fetchMe');
  }
}
