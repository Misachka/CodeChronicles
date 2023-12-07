import {
    UPDATE_POST,
    CREATE_POST,
    DELETE_POST
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            };

        case UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => {
                    return post._id !== action._id;
                })
            };

        default:
            return state;
    }
}