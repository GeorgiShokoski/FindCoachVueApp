import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

export default{
    state(){
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            didAutoLogout: false
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}