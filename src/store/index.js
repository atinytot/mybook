
import Vue from 'vue'
import Vuex from 'vuex'
import headerList from './modules/headerList'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		headerList
	}
})
