export default function({ store, route, redirect }) {
  console.log("inside authz");
  return store.dispatch("user/fetchOrgOptions");
}
