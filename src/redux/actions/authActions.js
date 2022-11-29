import ACTIONS from "./index"
import axios from "axios"

export const login = () => {
    return {
        type: ACTIONS.LOGIN,
    }
}

export const fetchUser = (info) => {
    if (info) return {
        type: ACTIONS.FETCH_USER,
        payload: {
            isLogged: true,
            user: info,
            role: info.role,
            isAdmin: info.role === 2 ? true : false
        },
    }
    return {
        type: ACTIONS.FETCH_USER,
        payload: {
            isLogged: false,
            user: null,
            role: null,
            isAdmin: false
        },
    }
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            role: res.data.role,
            isAdmin: res.data.role === 2 ? true : false
        }
    }
}