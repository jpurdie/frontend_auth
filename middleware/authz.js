export default function({ store }) {
  console.error("inside authz");
  return store.dispatch("user/fetchOrgOptions");
}
