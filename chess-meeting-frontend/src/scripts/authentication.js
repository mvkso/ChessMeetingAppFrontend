import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const urlHost = "http://localhost:8080/";



const authenticationHeader = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));


    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}


const register = (email, password, confirmedPassword, name, lastName, phoneNumber) => {
    return axios.post(API_URL + "signup", {
        email,
        password,
        confirmedPassword,
        name,
        lastName,
        phoneNumber
    }, {headers: authenticationHeader()});
};

const update = (employeeId,oldEmail,newEmail,  firstName, lastName, oldPhoneNumber, newPhoneNumber) => {

    return axios.put(urlHost+`${employeeId}`, {
        oldEmail,
        newEmail,
        firstName,
        lastName,
        oldPhoneNumber,
        newPhoneNumber,
    },{headers: authenticationHeader()});
};

const changePassword = (userId,oldPassword,newPassword, confirmedNewPassword) => {

    return axios.put(urlHost+`userDetails/${userId}/password`, {
        oldPassword,
        newPassword,
        confirmedNewPassword
    }, {headers: authenticationHeader()});
};


const addPostfix = (postfix) => {
    return axios.post(urlHost+'postfix/addPostfix', {
        postfix
    }, {headers: authenticationHeader()});
};

const updatePostfix = (postfixId,oldPostfix,newPostfix) => {
    return axios.put(urlHost+`postfix/updatePostfix/${postfixId}`, {
        oldPostfix,
        newPostfix
    }, {headers: authenticationHeader()});
};

const updatePhoneNumber = (userId, newPhoneNumber) => {
    return axios.put(urlHost+`userDetails/${userId}/phoneNumber`,
        {
            newPhoneNumber
        },{headers: authenticationHeader()});
};


const updateEmail = (userId, email) => {
    return axios.put(urlHost+`users/${userId}/email`,
        {
            email
        },{headers: authenticationHeader()});
};



const updateNameOrLastName = (userId, name, lastName) => {
    return axios.put(urlHost+`userDetails/${userId}/nameOrLastName`,
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

const createMeeting = (userId, DateTimeFrom, DateTimeTo, Subject, CityAddress, MinimumRank, Slots) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return axios.post(urlHost+'reservations/', {
        userId,
        DateTimeFrom,
        DateTimeTo,
        Subject,
        CityAddress,
        MinimumRank,
        Slots
    }, {headers: authenticationHeader()});
}

const bookReservation = (reservationId, userId) => {
    return axios.put(urlHost+`reservations/book/${reservationId}`, {
        reservationId,
        userId
    }, {headers: authenticationHeader()})
}

const cancelOrDeleteReservation = (reservationId, userId) => {
    return axios.put(urlHost+`reservations/cancel/${reservationId}`, {
        reservationId,
        userId
    }, {headers: authenticationHeader()})
}

const getPDF = (id) =>{
    return fetch( urlHost+`pdf/download/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
}

const createTopic = (title, content, category, userId) => {
    return axios.post(urlHost+`topic/`, {
        title,
        content,
        category,
        userId
    }, {headers: authenticationHeader()})
}

const addAnswer = (topicId, userId, content) => {
    return axios.post(urlHost+`topic/answer/`, {
        topicId,
        userId,
        content
    }, {headers: authenticationHeader()})
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
    updateNameOrLastName,
    createMeeting,
    bookReservation,
    cancelOrDeleteReservation,
    getPDF,
    createTopic,
    addAnswer,
};
