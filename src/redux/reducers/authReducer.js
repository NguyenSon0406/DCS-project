import ACTIONS from '../actions/'

const initialState = {
    user: [],
    role: 0,
    isLogged: false,
    isAdmin: false,
    authLoading: true,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                authLoading: true,
            }
        case ACTIONS.FETCH_USER:
            return {
                ...state,
                authLoading: false,
                isLogged: action.payload.isLogged,
                user: action.payload.user,
                role: action.payload.role,
                isAdmin: action.payload.isAdmin
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                role: action.payload.role,
                isAdmin: action.payload.isAdmin
            }
        default:
            return state
    }
}

export default authReducer