<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div class="title has-text-centered">How much per kilogram?</div>
        <Calculator
          :pricePerOne="pricePerOne"
          :calculatePricePerOne="calculatePricePerOne"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
  export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  @import 'bulma/sass/utilities/_all.sass';
  @import 'bulma/sass/elements/container.sass';
  @import 'bulma/sass/grid/columns.sass';
  @import 'bulma/sass/elements/title.sass';
</style>

