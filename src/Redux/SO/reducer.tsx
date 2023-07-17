import { AnyAction } from 'redux'
import * as actionName from './actionName'

const messageType = {
    type: '',
    message: ''
}

const expiredType = {
    token: '',
    isExpired: true
}

type dataList  = {
    "OrderId": number,
    "OrderNo" : string,
    "OrderDate" : string,
    "CustomerId": number,
    "Address" : string,
    "ItemList" : [],
    "CustomerName": string
}[]

const dataProps = [] as dataList

const postInitialState = {
    loading: false,
    error: messageType,
    success: messageType,
    expired: expiredType,
    posts: dataProps,
}

const initialState = {
    ...postInitialState,
    action: "",
}

const soReducer = (state: any = initialState, action: AnyAction): any => {
    const _actions = {
        [actionName.LOADING as string]: () => {
            return {
                ...state,
                action: action.type,
                loading: true,

            }
        },
        [actionName.UPDATE as string]: () => {
            return {
                ...state,
                action: action.type,
                posts: action.payload,
                loading: false,

            }
        },
        [actionName.ERROR as string]: () => {
            return {
                ...state,
                action: action.type,
                error: action.payload,
                loading: false,

            }
        },
        [actionName.SUCCESS as string]: () => {
            return {
                ...state,
                action: action.type,
                success: action.payload,
                loading: false,

            }
        },
        [actionName.TOKEN as string]: () => {
            return {
                ...state,
                action: action.type,
                loading: false,

            }
        },
        [actionName.UPDATE_TOKEN as string]: () => {
            return {
                ...state,
                action: action.type,
                expired: action.payload,
                loading: false,

            }
        },

        DEFAULT: () => state,
    }
    return (_actions[action.type] || _actions.DEFAULT)()
}

export default soReducer