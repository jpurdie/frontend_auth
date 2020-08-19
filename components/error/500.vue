<template>
  <div class="error-500">
    <h1 class="font-weight-regular grey--text text--darken-2">What did you do?!</h1>
    <p class="font-weight-regular grey--text text--darken-2">
      Am I ever gonna dance again?
    </p>
  </div>
</template>
<script>
export default {
  name: "Error500",
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
