import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

//TODO endpointy i nazwy

const authenticationHeader = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));


    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}


const register = (email, password, confirmedPassword, name, lastName, phoneNumber, region) => {
    return axios.post(API_URL + "signup", {
        email,
        password,
        confirmedPassword,
        name,
        lastName,
        phoneNumber,
        region
    }, {headers: authenticationHeader()});
};

const update = (employeeId,oldEmail,newEmail,  firstName, lastName, oldPhoneNumber, newPhoneNumber, region) => {

    return axios.put(`http://localhost:8080/employee/updateEmployee/${employeeId}`, {
        oldEmail,
        newEmail,
        firstName,
        lastName,
        oldPhoneNumber,
        newPhoneNumber,
        region
    },{headers: authenticationHeader()});
};

const changePassword = (userId,oldPassword,newPassword, confirmedNewPassword) => {

    return axios.put(`http://localhost:8080/employee/changePassword/${userId}`, {
        oldPassword,
        newPassword,
        confirmedNewPassword
    }, {headers: authenticationHeader()});
};


const addPostfix = (postfix) => {
    return axios.post('http://localhost:8080/postfix/addPostfix', {
        postfix
    }, {headers: authenticationHeader()});
};

const updatePostfix = (postfixId,oldPostfix,newPostfix) => {
    return axios.put(`http://localhost:8080/postfix/updatePostfix/${postfixId}`, {
        oldPostfix,
        newPostfix
    }, {headers: authenticationHeader()});
};

const updatePhoneNumber = (userId, newPhoneNumber) => {
    return axios.put(`http://localhost:8080/employee/updateEmployee/phoneNumber/${userId}`,
        {
            newPhoneNumber
        },{headers: authenticationHeader()});
};


const updateEmail = (userId, email) => {
    return axios.put(`http://localhost:8080/user/updateEmail/${userId}`,
        {
            email
        },{headers: authenticationHeader()});
};

const updateRegion = (userId, region) => {
    return axios.put(`http://localhost:8080/user/updateRegion/${userId}`,
        {
            region
        },{headers: authenticationHeader()});
};

const updateNameOrLastName = (userId, name, lastName) => {
    return axios.put(`http://localhost:8080/employee/updateEmployee/updateNameOrLastName/${userId}`,
        {
            name,
            lastName
        },{headers: authenticationHeader()});
}



const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        }/* , {headers: authenticatonHeader()}  */)
        .then((response) => {
            if (response.data.accessToken) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    sessionStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

const hasRole = (role) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const storedRole = user.userType;
    return storedRole === role;
}

const isLoggedIn = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(user !== null && user.accessToken !== null && user.userType !== null) return true;
    if(user == null || user.accessToken == null || user.userType == null) return false;
}

export default {
    authenticationHeader,
    register,
    update,
    login,
    logout,
    getCurrentUser,
    hasRole,
    isLoggedIn,
    addPostfix,
    updatePostfix,
    changePassword,
    updatePhoneNumber,
    updateEmail,
    updateRegion,
    updateNameOrLastName
};
