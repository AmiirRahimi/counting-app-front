import Vue from 'vue'

export const state = () => ({
    SellerOrTailors: [],
    Submited: false
})

export const getters = {
    GetSellerOrTailor(state) {
        return state.SellerOrTailors
    },
    GetSubmited(state) {
        return state.Submited
    }
}

export const mutations = {
    SetSellerOrTailors(state, sellerortailors) {
        state.SellerOrTailors = sellerortailors
    },
    SetSubmited(state, bool) {
        state.Submited = bool
    }
}

export const actions = {
    AddSellerOrTailor({ commit }, data) {
        Vue.http.post('seller-or-tailor/add/', data).then(response => {
            console.log(response.status);
            commit('SetSubmited', true)
        })
    },
    GetSellerOrTailor({ commit }) {
        Vue.http.get('seller-or-tailor/list/').then(response => {
            commit('SetSellerOrTailors', response.data)
        })
    }
}