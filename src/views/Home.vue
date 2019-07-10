<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="main-column column is-narrow">
        <Calculator
          :product="product"
          :setProductWeight="setProductWeight"
          :setProductPrice="setProductPrice"
          :resetProduct="resetProduct"
          :pricePerOne="pricePerOne"
          :settings="settings"
        />
        <div class="bottom-container">
          <button
            v-if="!isInstalled"
            class="button"
            type="button"
            @click="showInstallPrompt"
          >
            {{ $t('install') }}
          </button>
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
  import { mapState, mapActions, mapGetters } from 'vuex';

  import Calculator from '@/components/Calculator.vue';

  @Component({
    components: {
      Calculator,
    },

    computed: {
      ...mapState(['product', 'settings']),
      ...mapGetters(['pricePerOne']),
    },

    methods: {
      ...mapActions(['setProductWeight', 'setProductPrice', 'resetProduct']),
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

  .bottom-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
</style>

