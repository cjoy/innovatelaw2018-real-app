<template>
  <md-app md-waterfall md-mode="reveal">
    <md-app-toolbar class="md-primary">
      <a class="md-title" href="/"><img class="logo" src="./assets/logo.png" />REaL</a>
      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">My Account</md-button>
      </div>
    </md-app-toolbar>
    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.md-app {
  min-height: 100vh;
}
.logo {
  width: 60px;
}
.md-title {
  font-size: 1.7em;
  font-weight: bold;
}
.md-content {
  padding: 0;
}
</style>
