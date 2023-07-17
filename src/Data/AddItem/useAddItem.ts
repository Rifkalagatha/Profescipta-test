import { useMutation, UseMutationOptions, useQuery } from 'react-query'
import FetchAdapter, { FetchAdapterResponse } from '../../utils/FetchAdapter'
import { storage } from '../../storage';
import AdditemKeys from './queries'

export type ResponseAddItem = {
    Code : string,
    Description : string
}

export type AddItemVariables = {
    ItemId : number,
    OrderId : number,
    ItemName : string,
    Quantity : number,
    Price : number,
    IsNew : number,
}

type AddItemOptions = Omit<
    UseMutationOptions<
        FetchAdapterResponse<ResponseAddItem>,
        any,
        AddItemVariables,
        any
    >,
  'mutationKey' | 'mutationFn'
>

type resToken = {
    access_token : string,
    token_type : string,
    expires_in : number
}

function useAddItem(options?:AddItemOptions) {
    let credToken = {} as resToken
    const tokenStorage = storage.getString('TOKEN')
    if (tokenStorage) {
        credToken = JSON.parse(tokenStorage)
    }

    return useMutation<
        FetchAdapterResponse<ResponseAddItem>,
        any,
        AddItemVariables
    >(
        AdditemKeys.post,
        body => {
            return FetchAdapter.post('Order/CreateItem', {
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

export default useAddItem