import axios from 'axios';

const { AI_SERVER_HOST } = process.env;

export const createInstance = () => {
    const instance = axios.create({
        baseURL: AI_SERVER_HOST,
        withCredentials: true,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) =>
            // eslint-disable-next-line prefer-promise-reject-errors
            Promise.reject({
                response: {
                    status: error.response?.status || 503,
                    data: {
                        message:
                            error.response?.data.message ||
                            'Service temporarily unavailable',
                    },
                },
            }),
    );

    return instance;
};
