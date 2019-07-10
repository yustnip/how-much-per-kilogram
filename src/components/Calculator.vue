<template>
  <div class="calculator">
    <div class="field">
      <label class="label">{{ $t('weight') }}</label>
      <div class="control">
        <input
          v-model="$v.weight.$model"
          :placeholder="$t('weight-placeholder')"
          :class="{ 'is-danger': !$v.weight.minValue }"
          class="input" type="number"
        >
        <p v-if="!$v.weight.minValue" class="help is-danger">
          {{ $t('Minimal') }}: {{ $v.weight.$params.minValue.min }}
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $t('price') }}</label>
      <div class="control">
        <input
          v-model="price"
          :placeholder="$t('price-placeholder')"
          :class="{ 'is-danger': !$v.price.minValue }"
          class="input"
          type="number"
        >
        <p v-if="!$v.price.minValue" class="help is-danger">
          {{ $t('Minimal') }}: {{ $v.price.$params.minValue.min }}
        </p>
      </div>
    </div>
    <div v-show="pricePerOne && !this.$v.$invalid" class="price-per-one">
      <div class="price-per-one-text">
        <span class="price-per-one-title">{{ $t('price-per-one') }}</span>
        <br>
        <span class="price-per-one-value">{{ pricePerOne }}</span>
      </div>
      <button
        type="button"
        class="button is-primary"
        @click="resetProduct"
      >
        {{ $t('clear') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import { minValue } from 'vuelidate/lib/validators';
  import debounce from 'lodash/debounce';

  @Component({
    validations: {
      weight: {
        minValue: minValue(0.01),
      },

      price: {
        minValue: minValue(1),
      },
    },
  })
  export default class Calculator extends Vue {
    @Prop() private product: { weight: number | null, price: number | null };
    @Prop() private setProductWeight: (value: number | null ) => void;
    @Prop() private setProductPrice: (value: number | null) => void;
    @Prop() private resetProduct: () => void;
    @Prop() private pricePerOne: number | null;
    @Prop() private settings: { round: boolean, validationTimeout: boolean };

    weightTimeout: any = null;
    priceTimeout: any = null;
    debouncedSetWeight: (value: number | null) => void = debounce(this.setProductWeight, 1000);
    debouncedSetPrice: (value: number | null) => void = debounce(this.setProductPrice, 1000);

    get weight() {
      return this.product.weight ? this.product.weight : null;
    }
    set weight(value) {
      this.settings.validationTimeout ? this.debouncedSetWeight(value) : this.setProductWeight(value);
    }

    get price() {
      return this.product.price ? this.product.price : null;
    }
    set price(value) {
      this.settings.validationTimeout ? this.debouncedSetPrice(value) : this.setProductPrice(value);
    }
  }
</script>

<style scoped lang="scss">
  $primary: #357628;

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
