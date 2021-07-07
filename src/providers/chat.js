import axios from 'axios'
import { SERVER_URI } from "../config/env"
axios.defaults.baseURL = SERVER_URI;

export default class Chat {

    /**
     * Function to Get messages
     * @return Promise
     */

    getAllMessages() {
        return axios.get(`/rooms/messages`);
    }
}