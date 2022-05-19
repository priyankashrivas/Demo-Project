import axios from 'axios'
import { ApiUrl } from '../../config/ApiUrl';
// import { apiErrors } from '../config/HandleAPIErrors';


const SELECTED_USER = '[edit action] confirm update'

export const updateUser = (item,id) => {
 return axios.put(`${ApiUrl.selectedUpdateUser}?id=${id}`,item)
};

export const selectedUpdateUser = (item) => {
  return {
    type: SELECTED_USER,
    payload: item,
  };
};  