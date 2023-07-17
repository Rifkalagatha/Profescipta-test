import { useQuery } from 'react-query'
import FetchAdapter from '../../utils/FetchAdapter'
import { storage } from '../../storage';
import itemListKeys from './queries'


export type ListItemData = {
    ItemId : number,
    OrderId : number,
    ItemName : string,
    Quantity : number,
    Price : number,
    IsNew : number,
    IsDelete : number,
    IsUpdate : number,
}[]


type resToken = {
    access_token : string,
    token_type : string,
    expires_in : number
}

const useItemList = () => {
    let credToken = {} as resToken
    const tokenStorage = storage.getString('TOKEN')
    if (tokenStorage) {
        credToken = JSON.parse(tokenStorage)
    }

    return useQuery<ListItemData>(itemListKeys.all,  () => {
        return FetchAdapter.get('Order/GetItems', {
            headers : {
                'state': '12345', 
                'Authorization': 'Bearer ' + credToken.access_token
                // 'Authorization': 'Bearer g0UsEjt7SgMPZotNl8z77ZvG2kCVxRLkjlIhnc97DGTP7mbZS3mpEMuss67D0rf3IQxd9swiYPxux0KE1cXmMr_PHrMA661iAzR0dXVOfhaSnhdN-tgew2ildaY3bmfuT5R9dZ0mt6UvvDc2oNhKNLaEiwxlzhtPfsxpWszI9bRi7UamiRFxxIqQxoOJ1XPhYLAl9ST2aFRgs7F83E2fVg'
            }
        }).then(res => res.data)
    })

}

export default useItemList