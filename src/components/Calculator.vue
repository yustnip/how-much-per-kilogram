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
    <div v-show="pricePerOne" class="price-per-one">
      <div class="price-per-one-text">
        <span class="price-per-one-title">{{ $t('price-per-one') }}<sup>*</sup></span>
        <br>
        <span class="price-per-one-value">{{ pricePerOne }}</span>
      </div>
      <button
        type="button"
        class="button is-primary is-medium"
        @click="resetProduct"
      >
        {{ $t('clear') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class Calculator extends Vue {
    @Prop() private product: { weight: number | null, price: number | null };
    @Prop() private setProductWeight: (value: number | null ) => void;
    @Prop() private setProductPrice: (value: number | null) => void;
    @Prop() private resetProduct: () => void;
    @Prop() private pricePerOne: number | null;

    get weight() {
      return this.product.weight ? this.product.weight : null;
    }
    set weight(value) {
      this.setProductWeight(value);
    }

    get price() {
      return this.product.price ? this.product.price : null;
    }
    set price(value) {
      this.setProductPrice(value);
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
    margin-top: 20px;
    text-align: center;
  }

  .price-per-one-text {
    margin-bottom: 10px;
  }

  .price-per-one-title {
    font-size: 1.25rem;
  }

  .price-per-one-value {
    font-weight: 700;
    font-size: 1.5rem;
  }
</style>
