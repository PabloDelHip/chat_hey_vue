import axios from "axios";
import { SERVER_URI } from "./config/env"
axios.defaults.baseURL = SERVER_URI;