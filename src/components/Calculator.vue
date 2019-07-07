<template>
  <div class="calculator">
    <div class="field">
      <label class="label">{{ $t('weight') }}</label>
      <div class="control">
        <input v-model="weight" class="input" type="number" :placeholder="$t('weight-placeholder')">
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $t('price') }}</label>
      <div class="control">
        <input v-model="price" class="input" type="number" :placeholder="$t('price-placeholder')">
      </div>
    </div>
    <div class="field">
      <p class="control has-text-centered">
        <button
          @click="calculate"
          class="button is-primary"
          type="button"
        >
          {{ $t('calculate') }}
        </button>
      </p>
    </div>
    <p v-show="pricePerOne" class="has-text-centered">
      {{ $t('price-per-one') }}: <b>{{ pricePerOne }}</b>
    </p>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Calculator extends Vue {
    @Prop() private pricePerOne: null | string;
    @Prop({ default: () => {} }) private calculatePricePerOne: ({ weight, price }: { weight: null | number; price: null | number; } ) => void;

    weight: null | number = null;
    price: null | number = null;

    calculate() {
      this.calculatePricePerOne({ weight: this.weight, price: this.price });
    }
  }
</script>

<style scoped lang="scss">
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/form/_all.sass';
  @import 'bulma/sass/elements/button.sass';

  .calculator {
    min-width: 280px;
  }
</style>
