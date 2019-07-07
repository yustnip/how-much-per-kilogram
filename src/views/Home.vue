<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="main-column column is-narrow">
        <div class="title has-text-centered">{{ $t('how-much-per-kilogram') }}</div>
        <Calculator
          :pricePerOne="pricePerOne"
          :calculatePricePerOne="calculatePricePerOne"
        />
        <div v-if="!isInstalled" class="install-button-container">
          <button class="button" type="button" @click="showInstallPrompt">{{ $t('install') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  let deferredPrompt: any;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
  });

  import { Component, Vue } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';

  import Calculator from '@/components/Calculator.vue';

  @Component({
    components: {
      Calculator,
    },

    computed: {
      ...mapState(['pricePerOne']),
    },

    methods: {
      ...mapActions(['calculatePricePerOne']),
    },
  })
  export default class Home extends Vue {
    isInstalled: boolean = true;

    mounted() {
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        this.isInstalled = false;
      }
    }

    showInstallPrompt() {
      if (!deferredPrompt) {
        return;
      }

      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    }
  }
</script>

<style lang="scss" scoped>
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/elements/container.sass';
  @import 'bulma/sass/grid/columns.sass';
  @import 'bulma/sass/elements/title.sass';
  @import 'bulma/sass/elements/button.sass';

  .container {
    height: 100%;
  }

  .columns {
    height: 100%;
  }

  .main-column {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .install-button-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
</style>

