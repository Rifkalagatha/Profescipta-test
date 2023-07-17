import { useMutation, UseMutationOptions, useQuery } from 'react-query'
import FetchAdapter, { FetchAdapterResponse } from '../../utils/FetchAdapter'
import { storage } from '../../storage';
import AdditemKeys from './queries'

export type ResponseDeleteItem = {
    Code : string,
    Description : string
}

export type DeleteItemVariables = {
    ItemId : number,
    OrderId : number,
    ItemName : string,
    Quantity : number,
    Price : number
}

type DeleteItemOptions = Omit<
    UseMutationOptions<
        FetchAdapterResponse<ResponseDeleteItem>,
        any,
        DeleteItemVariables,
        any
    >,
  'mutationKey' | 'mutationFn'
>

type resToken = {
    access_token : string,
    token_type : string,
    expires_in : number
}

function useDeleteItem(options?:DeleteItemOptions) {
    let credToken = {} as resToken
    const tokenStorage = storage.getString('TOKEN')
    if (tokenStorage) {
        credToken = JSON.parse(tokenStorage)
    }

    return useMutation<
        FetchAdapterResponse<ResponseDeleteItem>,
        any,
        DeleteItemVariables
    >(
        AdditemKeys.post,
        body => {
            return FetchAdapter.post('Order/DeleteItem', {
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

export default useDeleteItem