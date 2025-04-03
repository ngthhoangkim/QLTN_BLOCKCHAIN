import axiosConfig from '../axiosConfig';

//get one
export const apiGetOneUser = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "get",
          url: `/api/auth/${id}`,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });