export default function({ store, route, redirect }) {
  return store.dispatch("userauth/fetchOrgOptions");
}
