import axios from "axios";
import { getAuthToken } from "./TokenUtils";

const token = getAuthToken('token');
const getConfig = {
    //   headers: { 'Content-Type': 'application/json','authorization': `Bearer ${token}`, },
    headers: { 'Content-Type': 'application/json' },
    baseURL: 'http://localhost:8080',
}
const postConfig = {
    //   headers: { 'Content-Type': 'application/json','authorization': `Bearer ${token}`, },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    baseURL: 'http://localhost:8080',
}
const withTokenConfig = {
    headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}`, },
    baseURL: 'http://localhost:8080',
}
const instance = axios.create(getConfig);
const instanceWithToken = axios.create(withTokenConfig);

// const getData = path => instance.get(path);
// export default getData;

export const getQuestList = () => instance.get('/quest/all');
export const getAdventurerList = () => instance.get('/adventurer/all');
export const getAdventurer = (id) => instance.get('/adventurer/' + id);
export const getAdventurerQuest = (id) => instance.get('/adventurer/' + id + '/quests');
export const register = (account, password, name, gender, species, job, status) => {
    return instance.post('/register',
        {
            "account": account,
            "password": password,
            "name": name,
            "gender": gender,
            "species": species,
            "job": job,
            "status": status
        }
    ).then((resp) => resp.data).catch((err) => { err.toString() });
}
export const newQuest = (title, description, requirements, timeframe, exp, rewards, requester) => {
    return instance.post('/new',
        {
            "title": title,
            "description": description,
            "requirements": requirements,
            "timeframe": timeframe,
            "exp": exp,
            "rewards": rewards,
            "requester": requester
        }
    ).then((resp) => resp.data).catch((err) => { err.toString() });
}

export const login = (account, password) => {
    return axios.post("http://localhost:8080/login",
        { username: account, password: password }, postConfig
    ).then((resp) => resp.data).catch((err) => { err.toString() });
}

export const logout = () => instance.get('/logout');
export const redirectLogin = () => instance.get('/login');

export const permit = () => instanceWithToken.get('/account/permit');
export const editAccount = (id, password, name, job, status) => {
    return instanceWithToken.post('/account/edit/' + id,
        {
            "password": password,
            "name": name,
            "job": job,
            "status": status
        }
    ).then((resp) => resp.data).catch((err) => { err.toString() });
};
export const acceptQuest = (requesteeId, qid) => {
    return instanceWithToken.post('/account/accept',
        {
            "requesteeId": requesteeId,
            "qid": qid
        }
    ).then((resp) => resp.data).catch((err) => { err.toString() });
}
