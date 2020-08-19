<template>
  <div class="error-404">
    <h1 class="font-weight-regular grey--text text--darken-2">This page doesn’t exist</h1>
    <p class="font-weight-regular grey--text text--darken-2">
      The link you clicked on may be broken or no longer exist.
    </p>
  </div>
</template>
<script>
export default {
  name: "Error404",
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
