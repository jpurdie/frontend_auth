<template>
  <div>
    <v-alert type="success">
      You should see this page without need to authentication!
    </v-alert>
  </div>
</template>

<script>
export default {
  options: {
    auth: false
  }
}
</script>
