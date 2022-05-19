

import axios from 'axios';
import { API } from '../../config/ApiUrl';


export const CONFIRMED_EDIT_USER_ACTION = "[signup action] confirmed edit";


//delete users
export function deleteUsersList(id, callback) {
    const request = axios.delete(`${API.deleteUsers}?id=${id}`);
    return (dispatch) => {
        request.then((res) => {
            callback(res);
        })
        .catch(function (error) {
            console.log("error", error.response);
            callback(error);
        })
    }

}

export function updateUser(post, id) {
    return axios.put(`${API.updateUsers}?id=${id}.json`, post);
}

export function setSelectedData(item) {
    return {
        type: CONFIRMED_EDIT_USER_ACTION,
        payload: item,
    }
}






