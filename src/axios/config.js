import axios from "axios";

const ApiFetch = axios.create({
    baseURL: "https://localhost:44332/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default ApiFetch;
