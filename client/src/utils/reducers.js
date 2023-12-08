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
 
            const updatedIndex = state.posts.findIndex(post => post._id === action.post._id);

            const updatedPosts = [...state.posts];
            updatedPosts[updatedIndex] = action.post;

            return {
                ...state,
                posts: updatedPosts
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
