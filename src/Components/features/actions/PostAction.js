//importing from library
import axios from "axios";

//importing from component
import { API } from "../../config/ApiUrl";

//action type for edit
export const CONFIRMED_EDIT_USER_ACTION = "[signup action] confirmed edit";

//delete users action creator function
export function deleteUsersList(id, callback) {
  const request = axios.delete(`${API.deleteUsers}?id=${id}`);
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
  return axios.put(`${API.updateUsers}?id=${id}.json`, post);
}

//action creator for edit for id
export function setSelectedData(item) {
  return {
    type: CONFIRMED_EDIT_USER_ACTION,
    payload: item,
  };
}
