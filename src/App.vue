<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/base/_all.sass';

  html, body {
    height: 100%;
  }

  .app {
    padding: 20px;
    height: 100%;
  }
</style>
