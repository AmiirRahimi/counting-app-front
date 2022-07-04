export const state = () => ({
    NotFoundUserState: true,
    NotFoundUserMsg: "کاربری با مشخصات وارد شده یافت نشد",
    PhonenumberStructureState: true,
    PhonenumberStructureMsg: 'ساختار شماره وارد شده اشتباه است',
    WrongPasswordState: true,
    WrongPasswordMsg: 'کد وارد شده معتبر نیست',
})

export const getters = {
    GetNotFoundUserState(state) {
        return state.NotFoundUserState
    },
    GetNotFoundUserMsg(state) {
        return state.NotFoundUserMsg
    },
    GetPhonenumberStructureState(state) {
        return state.PhonenumberStructureState
    },
    GetPhonenumberStructureMsg(state) {
        return state.PhonenumberStructureMsg
    },
    GetWrongPasswordState(state) {
        return state.WrongPasswordState
    },
    GetWrongPasswordMsg(state) {
        return state.WrongPasswordMsg
    }
}

export const mutations = {
    SetNotFoundUserState(state, NotFoundUserState) {
        state.NotFoundUserState = NotFoundUserState
    },
    SetPhonenumberStructureState(state, PhonenumberStructureState) {
        state.PhonenumberStructureState = PhonenumberStructureState
    },
    SetWrongPasswordState(state, WrongPasswordState) {
        state.WrongPasswordState = WrongPasswordState
    }
}

export const actions = {
    CheckPhonenumberStructure({ commit, dispatch }, phonenumber) {
        const re = /09\d{9}$/
        const check = re.test(phonenumber)
        commit('SetPhonenumberStructureState', check)
    }
}