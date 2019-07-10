<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column">
        <div class="field">
          <label class="checkbox">
            <input v-model="round" type="checkbox">
            {{ $t('round-setting') }}
          </label>
        </div>
        <div class="field">
          <label class="checkbox">
            <input v-model="validationTimeout" type="checkbox">
            {{ $t('Timeout before the values check') }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mapState, mapActions } from 'vuex';

  @Component({
    computed: {
      ...mapState(['settings']),
    },

    methods: {
      ...mapActions(['setRoundSetting', 'setValidationTimeout']),
    },
  })
  export default class Settings extends Vue {
    settings: { round: boolean, validationTimeout: boolean };
    setRoundSetting: (value: boolean) => void;
    setValidationTimeout: (value: boolean) => void;

    get round() {
      return this.settings.round;
    }
    set round(value: boolean) {
      this.setRoundSetting(value);
    }

    get validationTimeout() {
      return this.settings.validationTimeout;
    }
    set validationTimeout(value: boolean) {
      this.setValidationTimeout(value);
    }
  }
</script>

<style lang="scss" scoped>
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/form/_all.sass';
</style>
