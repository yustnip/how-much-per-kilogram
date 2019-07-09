<template>
  <div class="app">
    <div class="navbar is-primary">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">{{ $t('how-much-per-kilogram') }}</router-link>
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/">{{ $t('calculator') }}</router-link>
          <router-link class="navbar-item" to="/settings">{{ $t('settings') }}</router-link>
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="isAppUpdated && !isNotificationClosed" class="notification">
        <button class="delete" @click="closeNotification"></button>
        {{ $t('release-notes') }}
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Calculator extends Vue {
    isNotificationClosed: boolean = false;

    initMenu() {
      document.addEventListener('DOMContentLoaded', () => {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        if ($navbarBurgers.length > 0) {
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              el.classList.toggle('is-active');
              if ($target) $target.classList.toggle('is-active');
            });
          });
        }
      });
    }

    get isAppUpdated() {
      const rawIsAppUpdated = window.localStorage.getItem('isAppUpdated');

      if (!rawIsAppUpdated) return false;

      const isAppUpdated = JSON.parse(rawIsAppUpdated);
      window.localStorage.removeItem('isAppUpdated');
      return isAppUpdated;
    }

    mounted() {
      this.initMenu();
    }

    closeNotification() {
      this.isNotificationClosed = true;
    }
  }
</script>


<style lang="scss">
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/base/_all.sass';

  html, body {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  $primary: #357628;

  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/components/navbar.sass';
  @import 'bulma/sass/elements/notification.sass';
  @import 'bulma/sass/elements/other.sass';

  .app {
    height: 100%;
  }

  .main {
    padding: 20px;
    height: calc(100% - 52px);
  }

  .notification {
    white-space: pre-line;
  }
</style>
