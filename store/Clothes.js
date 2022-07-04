import Vue from 'vue'

export const state = () => ({
    Clothes: [],
    Submited: false
})

export const getters = {
    GetClothes(state) {
        return state.Clothes
    },
    GetSubmited(state) {
        return state.Submited
    }
}

export const mutations = {
    SetClothes(state, clothes) {
        state.Clothes = clothes
    },
    SetSubmited(state, bool) {
        state.Submited = bool
    }
}

export const actions = {
    AddCloth({ commit, dispatch }, data) {
        Vue.http.post('cloth/add/', data).then(response => {
            if (response.status == 200) {
                commit('SetSubmited', true)
            }
        })
    },
    GetClothes({ commit }) {
        Vue.http.get('cloth/list/').then(response => {
            if (response.status == 200) {
                commit('SetClothes', response.data)
            }
        })
    }
}