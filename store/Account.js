import Vue from 'vue'
import router from 'vue-router'

export const state = () => ({
    phonenumber: '',
    phonenumberFieldCondition: true,
    passwordFieldCondition: false,
    IsAuthenticated: false,
    UserFullname: '',
    UserPhonenumber: '',
    UserDataState: false
})

export const getters = {
    GetPhonenumber(state) {
        return state.phonenumber
    },
    PhonenumberCondition(state) {
        return state.phonenumberFieldCondition
    },
    PasswordCondition(state) {
        return state.passwordFieldCondition
    },
    GetUserAuthenticationState(state) {
        return state.IsAuthenticated
    },
    GetUserFullname(state) {
        return state.UserFullname
    },
    GetUserPhonenumber(state) {
        return state.UserPhonenumber
    },
    GetUserDataState(state) {
        return state.UserDataState
    },

}

export const mutations = {
    SetPhonenumber(state, phonenumber) {
        return state.phonenumber = phonenumber
    },
    SetPhonenumberCondition(state, bool) {
        state.phonenumberFieldCondition = bool
    },
    SetPasswordCondition(state, bool) {
        state.passwordFieldCondition = bool
    },
    SetUserAuthenticationState(state, bool) {
        state.IsAuthenticated = bool
    },
    SetUserFullname(state, fullname) {
        state.UserFullname = fullname
    },
    SetUserPhonenumber(state, phonenumber) {
        state.UserPhonenumber = phonenumber
    },
    SetUserDataState(state, bool) {
        state.UserDataState = bool
    },
}

export const actions = {
    CheckPhonenumber({ commit, dispatch, rootGetters }, phonenumber) {
        if (rootGetters['LoginErrs/GetPhonenumberStructureState'] == true) {
            Vue.http.post('user/check-phonenumber/', { 'phonenumber': phonenumber }).then(response => {
                if (response.status == 200) {
                    commit('SetPhonenumberCondition', false)
                    commit('SetPasswordCondition', true)
                    commit('SetPhonenumber', phonenumber)
                }
                if (response.status == 204) {
                    commit('LoginErrs/SetNotFoundUserState', false, { root: true })
                }
            })
        }
    },
    async Login({ commit, state, dispatch }, password) {
        await Vue.http.post("user/login/", { 'phonenumber': state.phonenumber, 'password': password }).then(response => {
            console.log(response.status);
            commit('SetUserAuthenticationState', true)
            Vue.$cookies.set('refresh', response.data['refresh'], '30d')
            Vue.$cookies.set('access', response.data['access'], '30d')
            this.$router.push('/dashboard')
        }).catch(err => {
            if (err.status == 404) {
                commit('LoginErrs/SetWrongPasswordState', false, { root: true })
            }
        })
    },
    async RefreshToken({ commit }) {
        await Vue.http.post("api/token/refresh/", { 'refresh': Vue.$cookies.get('refresh') }).then(response => {
            Vue.$cookies.remove('access')
            Vue.$cookies.set('access', response.data['access'], 30)
            commit('SetUserAuthenticationState', true)
        }).catch(err => {
            if (err.status != 200) {
                Vue.$cookies.remove('access')
                Vue.$cookies.remove('refresh')
                commit('SetUserAuthenticationState', false)
            }
        })
    },
    async ChechAuthenticated({ commit, dispatch }) {
        await Vue.http.post("api/token/verify/", { 'token': Vue.$cookies.get("access") }).then(response => {
            console.log(response.status);
            commit('SetUserAuthenticationState', true)
        }).catch(err => {
            dispatch('RefreshToken')
        })
    },
    GetUserData({ commit }) {
        Vue.http.post('user/get-user-data/').then(response => {
            commit('SetUserFullname', response.data['full_name'])
            commit('SetUserPhonenumber', response.data['phonenumber'])
            commit('SetUserDataState', true)
        })
    }
}