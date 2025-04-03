import axiosConfig from '../axiosConfig';

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/auth/register',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        console.log(payload)
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/auth/login',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
})


