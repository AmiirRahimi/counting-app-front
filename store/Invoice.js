import Vue from 'vue'

export const state = () => ({
    NotRegisterdInvoice: [],
    Invoices: [],
    Totals: {},
    NoContent: true,
    Registered: false,
    Submited: false,
    ShowContent: false,
})

export const getters = {
    GetNotRegisterdInvoice(state) {
        return state.NotRegisterdInvoice
    },
    GetNoContent(state) {
        return state.NoContent
    },
    GetInvoices(state) {
        return state.Invoices
    },
    GetSubmited(state) {
        return state.Submited
    },
    GetRegistered(state) {
        return state.Registered
    },
    GetTotals(state) {
        return state.Totals
    },
    GetShowContent(state) {
        return state.ShowContent
    }
}

export const mutations = {
    SetNotRegisterdInvoice(state, notregisterdinvoice) {
        state.NotRegisterdInvoice = notregisterdinvoice
    },
    SetNoContent(state, bool) {
        state.NoContent = bool
    },
    SetInvoices(state, invoices) {
        state.Invoices = invoices
    },
    SetSubmited(state, bool) {
        state.Submited = bool
    },
    SetRegistered(state, bool) {
        state.Registered = bool
    },
    SetTotals(state, totals) {
        state.Totals = totals
    },
    SetContent(state, bool) {
        state.ShowContent = bool
    }
}

export const actions = {
    SetNotRegisterdInvoices({ commit }, data) {
        Vue.http.post('invoice/get-not-registerd/', data).then(response => {
            if (response.data.length != 0) {
                console.log(response.data);
                commit('SetNotRegisterdInvoice', response.data)
                commit('SetNoContent', false)
            }
        })
    },
    AddItemForNotRegisterdInvoice({ commit, dispatch }, data) {
        Vue.http.post('invoice/add/', data).then(response => {
            if (response.status == 200) {
                dispatch('SetNotRegisterdInvoices', data)
                commit('SetRegistered', true)
                dispatch('GetTotals', data)
            }
        })
    },
    SubmitInvoice({ commit, dispatch }, data) {
        Vue.http.post('invoice/submit/', data).then(response => {
            if (response.status == 200) {
                commit('SetSubmited', true)
            }
        })
    },
    GetTotals({ commit }, data) {
        Vue.http.post('invoice/get_totals/', data).then(response => {
            if (response.status == 200) {
                commit('SetTotals', response.data)
            }
        })
    },
    GetInvoices({ commit, dispatch }, data) {
        Vue.http.post('invoice/list/', data).then(response => {
            if (response.status == 200) {
                commit('SetInvoices', response.data)
                if (response.data.length != 0) {
                    commit('SetContent', true)
                }
            }
        })
    }
}