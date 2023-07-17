import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import { Config } from '../../constants';
import { storage } from '../../storage';
import * as actionName from './actionName'

type resToken = {
    access_token : string,
    token_type : string,
    expires_in : number
}

export const getToken = () => {
    return (dispatch:any) => {
        return Axios.request(
            {
                method : 'post',
                maxBodyLength: Infinity,
                url: Config.base_Url + 'token',
                headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : Config.cred
            }
        )
        .then(res => {
            let credToken = {} as resToken
            storage.set('TOKEN', JSON.stringify(res.data) )
           
            credToken = JSON.parse(res.data)
            dispatch(updateToken({
                token: credToken.access_token,
                isExpired: false
            }))
            
            console.log(JSON.stringify(res.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}


 

export const getOrderList = () => {
    let credToken = {} as resToken
    const tokenStorage = storage.getString('TOKEN')
    if (tokenStorage) {
        credToken = JSON.parse(tokenStorage)
    }


    return (dispatch: any) => {
        dispatch(loadingPost())
        return Axios.request(
            {
                method: 'get',
                maxBodyLength: Infinity,
                url: Config.base_Url + 'Order/GetOrderList',
                headers: { 
                  'Authorization': 'Bearer ' + credToken.access_token
                }
              }
        ).then(res => {
            dispatch(updatePost(res.data))
            dispatch(successPost({
                message: "Success GET Post",
                type: actionName.GET_ORDER_LIST,
            }))
            dispatch(errorPost({
                message: "",
                type: actionName.GET_ORDER_LIST,
            }))
           
        }).catch(err => {
            // @ts-ignore
            dispatch(updatePost(undefined))

            dispatch(errorPost({
                message: "Error get Post",
                type: actionName.GET_ORDER_LIST,
            }))
            dispatch(updateToken({
                token: '',
                isExpired: true
            }))
        })
    }
}

export const Item = (payload:number) => ({
    type: actionName.ITEM,
    payload: payload
})

export const loadingPost = () => ({
    type: actionName.LOADING,
})
export const resetPost = () => ({
    type: actionName.RESET,
})

export const updateToken = (payload: {
}) => ({
    type: actionName.UPDATE_TOKEN,
    payload : payload,
})
export const updatePost = (payload: {
    "OrderId": number,
    "OrderNo" : string,
    "OrderDate" : string,
    "CustomerId": number,
    "Address" : string,
    "ItemList" : [],
    "CustomerName": string
}[]) => ({
    type: actionName.UPDATE,
    payload: payload,
})
export const successPost = (payload: {
    type: string,
    message: string,
}) => ({
    type: actionName.SUCCESS,
    payload,
})
export const errorPost = (payload: {
    type: string,
    message: string,
}) => ({
    type: actionName.ERROR,
    payload: payload,
})