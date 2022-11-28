import axios from "axios";
const url = "http://localhost:8000";

export const credit = async (obj) =>  {
    try {
        // console.log(obj, "from api.js");
        const details = await axios.post(`${url}/credit`, obj,  { withCredentials: true });
        // console.log(details.data.message);
        return details.data.message;
    } catch (error) {
        console.log("error from credit");
    }
}

export const withdraw = async (obj) => {
    try {
        // console.log(obj, "details from api.js");
        const details = await axios.post(`${url}/withdraw`, obj, { withCredentials: true });
        return details.data.message;
    } catch (error) {
        console.log("error from withdraw");
    }
}

export const transfer = async (obj) => {
    try {
        console.log(obj, "details from api.js");
        const details = await axios.post(`${url}/transfer`, obj, { withCredentials: true });
        return details.data.message;
    } catch (error) {
        console.log("error from transfer");
    }
}

export const loan = async (obj) => {
    try {
        // console.log(obj, "details from api.js");
        const details = await axios.post(`${url}/loan`, obj , { withCredentials: true })
        return details.data.message;
    } catch (error) {
        console.log("error from loan");
    }
}