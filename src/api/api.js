import axios from "axios";

/** API Class.
 * 
 * Static class tying toghether used to get/send to the API.
 * There shouldn't be any frontend-spicific stuff here, and there shouldn't be any API-aware stuff 
 * elsewhere in the frontend.
 * 
 */

class UserApi {
    //the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {

        const url = `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${UserApi.token}`};
        const params = (method === "get") ? data : {};        

        try {
            return (await axios({ url, method, data, params, headers })).data;                        
        } catch(err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //Individual API routes
    
    /**Get token for login from username, password */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");         
        return res.token;
    }

    /**Sighn up for site */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page */
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }
    
    static async createNewRestaurant(data) {
        let res = await this.request("restaurant", data, "post");
        return res.restaurant;
    }
    
    static async getRestaurant(name) {
        let res = await this.request("restaurant", {name});
        return res.restaurants;
    }

    static async get(id) {
        let res = await this.request(`restaurant/${id}`);
        return res.restaurant;
    }

    static async updateRestaurant(id, data) {
        let res = await this.request(`restaurant/${id}`, data, "patch");
        return res.restaurant;
    }

    static async removeRestaurant(id) {
        return await this.request(`restaurant/${id}`, "delete", "delete");   
    }

    static async getAllPostedRes() {
        let res = await this.request(`restaurant`);
        return res.restaurants;
    }
}


export default UserApi;
