import { review } from '../../client';
import { REVIEW } from '../../utils/review';

export function saveReview(heading, comment, rating, writer, restaurantID, images) {

    return async (dispatch) => {

        const result = await review.saveReview(heading, comment, rating, writer, restaurantID, images);

        if (result.success) {
            dispatch({
                type: REVIEW.saveReview,
                data: result,
            });
        }

        return {
            success: false
        };
    };
}

export function getReview(restaurantId) {

    return async (dispatch) => {

        const result = await review.getReview(restaurantId);

        if (result.success) {
            dispatch({
                type: REVIEW.getReview,
                data: result,
            });
            return { success: true };
        }

        return {
            success: false
        };
    };
}
