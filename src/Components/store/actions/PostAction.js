// import axios from 'axios'
// import { ApiUrl } from '../../config/ApiUrl';
// // import { apiErrors } from '../config/HandleAPIErrors';


// const SELECTED_USER = '[edit action] confirm update'

// export const updateUser = (item,id) => {
//  return axios.put(`${ApiUrl.selectedUpdateUser}?id=${id}`,item)
// };

// export const selectedUpdateUser = (item) => {
//   return {
//     type: SELECTED_USER,
//     payload: item,
//   };
// };  

import axios from "axios";

//importing from component
import { ApiUrl } from "../../config/ApiUrl";

//action type for edit
export const CONFIRMED_EDIT_USER_ACTION = "[signup action] confirmed edit";

//delete users action creator function
export function deleteUsersList(id, callback) {
  const request = axios.delete(`${ApiUrl.deleteUsers}?id=${id}`);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error", error.response);
        callback(error);
      });
  };
}
//update user action creator function
export function updateUser(post, id) {
  return axios.put(`${ApiUrl.updateUsers}?id=${id}.json`, post);
}

//action creator for edit for id
export function setSelectedData(item) {
  return {
    type: CONFIRMED_EDIT_USER_ACTION,
    payload: item,
  };
}