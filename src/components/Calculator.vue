<template>
  <div class="calculator">
    <div class="field">
      <label class="label is-medium">{{ $t('weight') }}</label>
      <div class="control">
        <input v-model="weight" class="input is-medium" type="number" :placeholder="$t('weight-placeholder')">
      </div>
    </div>
    <div class="field">
      <label class="label is-medium">{{ $t('price') }}</label>
      <div class="control">
        <input v-model="price" class="input is-medium" type="number" :placeholder="$t('price-placeholder')">
      </div>
    </div>
    <div v-show="isPricePerOneValid" class="price-per-one">
      <div class="price-per-one-text">
        <span class="price-per-one-title">{{ $t('price-per-one') }}<sup>*</sup></span>
        <br>
        <span class="price-per-one-value">{{ pricePerOne }}</span>
      </div>
      <button
        type="button"
        class="button is-primary"
        @click="clear"
      >
        {{ $t('clear') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component({
    props: ['pricePerOne', 'calculatePricePerOne'],
  })
  export default class Calculator extends Vue {
    @Prop() private pricePerOne: null | number;
    @Prop({ default: () => {} }) private calculatePricePerOne: ({ weight, price }: { weight: null | number; price: null | number; } ) => void;

    weight: null | number = null;
    price: null | number = null;

    get isPricePerOneValid() {
      return this.pricePerOne && Number.isFinite(this.pricePerOne)
    }

    @Watch('weight')
    onWeightChanged(value: null | number) {
      this.calculatePricePerOne({ weight: this.weight, price: this.price });
    }

    @Watch('price')
    onPriceChanged(value: null | number) {
      this.calculatePricePerOne({ weight: this.weight, price: this.price });
    }

    clear() {
      this.weight = null;
      this.price = null;
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

  .price-per-one {
    margin-top: 40px;
    text-align: center;
  }

  .price-per-one-text {
    margin-bottom: 10px;
  }

  .price-per-one-title {
    font-size: 1rem;
  }

  .price-per-one-value {
    font-weight: 700;
    font-size: 1.25rem;
  }
</style>
