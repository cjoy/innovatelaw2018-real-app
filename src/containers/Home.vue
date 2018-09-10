<template>
  <div class="container">
    <div class="text">
      <div class="title-text">
        <h2 class="primary-title">Get real help.</h2>
        <h2 class="secondary-title">What we offer.</h2>
        <b class="title-points">1. Helps you figure out if you're owed entitlements.</b>
        <b class="title-points">2. Helps you gather records and evidence.</b>
        <b class="title-points">3. Helps you create a letter of demand.</b>
      </div>
      <div class="md-layout features">
        <div class="md-layout-item">
          <md-card class="feature-card">
            <md-card-header>
              <div class="md-title">About Us</div>
            </md-card-header>
          </md-card>
        </div>
        <div class="md-layout-item">
          <a href="/form">
            <md-card class="feature-card">
              <md-card-header>
                <div class="md-title">Get Started</div>
              </md-card-header>
            </md-card>
          </a>
        </div>
        <div class="md-layout-item">
          <md-card class="feature-card">
            <md-card-header>
              <div class="md-title">FAQs</div>
            </md-card-header>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style scoped>
.primary-title {
  font-size: 5em;
  color: white;
  font-weight: bold;
}
.secondary-title {
  font-size: 3.3em;
  color: white;
  font-weight: bold;
}
.text {
  height: 80%;
  padding: 100px;
}
.title-text {
  width: 50%;
  overflow-wrap: break-word;
}
.container {
  background-image: url('/background.png');
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
}
.features {
  margin-top: 140px;
}
.feature-card {
  min-height: 300px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.feature-card .md-title {
  font-size: 3.5em;
}
.title-points {
  padding: 0.4em;
  display: block;
  color: white;
  font-size: 2em;
}
</style>
