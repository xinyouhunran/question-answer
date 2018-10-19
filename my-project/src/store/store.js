import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	    detial: {}
	  },
	  mutations: {
	    increment (state,n) {
	      state.detial = n.detial;
	     /* console.log(state.detial)*/
	    }
	  },
	  actions: {
	    increment (context,n) {
	      context.commit('increment')
	    }
	  }
})
