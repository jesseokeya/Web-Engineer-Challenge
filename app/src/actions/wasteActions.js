import axios from 'axios'
import { GET_WASTES, SEARCH_WASTES, GET_ERRORS, LOADING } from './types';

const getWastes = _ => dispatch => {
    dispatch(setLoading())
    axios
        .get(`/api/wastes`)
        .then(res =>
            dispatch({
                type: GET_WASTES,
                payload: res.data
            })
        )
        .catch(_ =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

const searchWastes = ({ search }) => dispatch => {
    dispatch(setLoading())
    axios
        .get(`/api/wastes?query=${search}`)
        .then(res =>
            dispatch({
                type: SEARCH_WASTES,
                payload: res.data
            })
        )
        .catch(_ =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

const setLoading = () => {
    return {
        type: LOADING
    };
};

export { getWastes, searchWastes, setLoading }
