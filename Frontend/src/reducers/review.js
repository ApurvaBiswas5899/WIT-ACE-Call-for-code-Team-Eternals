import { REVIEW } from '../utils/review';

const initialState = {
    reviews: [
        {
            id: 1,
            rate: "4.5",
            name: "Deb Sinha",
            headline: "The food quality was very good",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            rate: "4",
            name: "Debjyoti Sinha",
            headline: "The food quality was very good",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ],
    myReview: {},
}

export default function review(state = initialState, action) {
    if (action.type === REVIEW.addReview) {
        return { ...state, myReview: action.data.result }
    }
    if (action.type === REVIEW.getReview) {
        return { ...state, reviews: action.data.reviews }
    }
    // state.append("myjsonkey", JSON.stringify(reviews));

    // action.data not updated in docs - Took dummy variables
    return state;
}