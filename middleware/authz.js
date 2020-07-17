export default function({ store }) {
  // TODO: fix this sending on all route changes
  return store.dispatch("user/fetchOrgOptions");
}
