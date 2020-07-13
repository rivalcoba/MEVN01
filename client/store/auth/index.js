import mutations from './mutations';
import getters from './getters';
import actions from './actions';

let initialState = null;

try {
    // Decode the local storage variable auth
    initialState = JSON.parse(localStorage.getItem('auth'));
} catch (error) {
    initialState = {
        user: null,
        token : null
    }
}

export default{
    state: initialState,
    actions,
    getters,
    mutations
}