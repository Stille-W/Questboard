import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setToken = (token) => {
    cookies.set('token', token,
        { path: '/', secure: true, sameSite: true }
    );
    // console.log(cookies.get('token'));
};

export const getAuthToken = (name) => {
    if (cookies.get(name) === undefined) {
        return '';
    }
    return cookies.get('token');
};

export const deleteToken = () => {
    if (cookies.get('token')) {
        cookies.remove('token');
    }
};