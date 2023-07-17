import { useMutation, UseMutationOptions, useQuery } from 'react-query'
import FetchAdapter, { FetchAdapterResponse } from '../../utils/FetchAdapter'
import { storage } from '../../storage';
import AdditemKeys from './queries'

export type ResponseUpdateItem = {
    Code : string,
    Description : string
}

export type UpdateItemVariables = {
    ItemId : number,
    OrderId : number,
    ItemName : string,
    Quantity : number,
    Price : number,
    IsUpdate : number,
    IsNew : number
}

type UpdateItemOptions = Omit<
    UseMutationOptions<
        FetchAdapterResponse<ResponseUpdateItem>,
        any,
        UpdateItemVariables,
        any
    >,
  'mutationKey' | 'mutationFn'
>

type resToken = {
    access_token : string,
    token_type : string,
    expires_in : number
}

function useUpdateItem(options?:UpdateItemOptions) {
    let credToken = {} as resToken
    const tokenStorage = storage.getString('TOKEN')
    if (tokenStorage) {
        credToken = JSON.parse(tokenStorage)
    }

    return useMutation<
        FetchAdapterResponse<ResponseUpdateItem>,
        any,
        UpdateItemVariables
    >(
        AdditemKeys.post,
        body => {
            return FetchAdapter.post('Order/UpdateItem', {
                headers : {
                    'state': '12345', 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + credToken.access_token
                },
                body: JSON.stringify(body),
            })
        },
        options
    )
}

export default useUpdateItem