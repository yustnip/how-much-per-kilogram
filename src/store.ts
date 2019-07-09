import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ['settings'] })],

  state: {
    product: {
      weight: 0,
      price: 0,
    },
    settings: {
      round: false,
    },
  },

  mutations: {
    setProductWeight({ product }, payload) {
      product.weight = payload;
    },

    setProductPrice({ product }, payload) {
      product.price = payload
    },

    resetProduct(state) {
      state.product = { weight: 0, price: 0 };
    },

    setRoundSetting({ settings }, payload) {
      settings.round = payload;
    },
  },

  actions: {
    setProductWeight({ commit }, payload) {
      commit('setProductWeight', payload);
    },

    setProductPrice({ commit }, payload) {
      commit('setProductPrice', payload);
    },

    resetProduct({ commit }) {
      commit('resetProduct');
    },

    setRoundSetting({ commit }, payload) {
      commit('setRoundSetting', payload);
    },
  },

  getters: {
    pricePerOne({ product, settings }) {
      if (!product.weight || !product.price) {
        return null;
      }

      const pricePerOne = (product.price / product.weight).toFixed(2);

      if (!pricePerOne) {
        return null;
      }

      const numberPricePerOne = Number(pricePerOne);
      return settings.round ? Math.round(numberPricePerOne) : numberPricePerOne;
    },
  },
})
