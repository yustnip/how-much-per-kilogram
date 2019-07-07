import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pricePerOne: null,
  },

  mutations: {
    setPricePerOne(state, payload) {
      state.pricePerOne = payload;
    }
  },

  actions: {
    calculatePricePerOne({ commit }, { weight, price }: { weight: null | number; price: null | number; }) {
      if (!weight || !price) {
        commit('setPricePerOne', null);
        return;
      }

      const pricePerOne = Math.round(price / weight);
      commit('setPricePerOne', pricePerOne);
    },
  },
})
