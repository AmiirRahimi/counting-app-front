import Vue from 'vue'

export const state = () => ({
    data: [],
    Submited: false,
})

export const getters = {
    GetInvoices(state) {
        return state.data
    },
    GetSubmited(state) {
        return state.Submited
    }
}

export const mutations = {

    SetInvoices(state, data) {
        state.data = data
    },
    SetSubmited(state, bool) {
        state.Submited = bool
    }
}