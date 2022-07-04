import Vue from 'vue'

export const state = () => ({
    Customers: [],
    Submited: false
})

export const getters = {
    GetCustomers(state) {
        return state.Customers
    },
    GetSubmited(state) {
        return state.Submited
    }
}

export const mutations = {
    SetCustomers(state, customers) {
        state.Customers = customers
    },
    SetSubmited(state, bool) {
        state.Submited = bool
    }
}

export const actions = {
    AddCustomer({ commit }, data) {
        Vue.http.post('customer/add/', data).then(response => {
            if (response.status == 200) {
                commit('SetSubmited', true)
            }
        })
    },
    GetCustomers({ commit }) {
        Vue.http.get('customer/list/').then(response => {
            commit('SetCustomers', response.data)
        })
    }
}