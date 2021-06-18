import { filter } from '../../client';
import { FILTER } from '../../utils/filter';

export function updateFilter(status, rating, category, latitude, longitude) {

    return async (dispatch) => {

        const result = await filter.updateFilter(status, rating, category, latitude, longitude);
        if (result.success) {

            dispatch({
                type: FILTER.byCategory,
                data: result,
            });
        }
        // alert('Successful Action')
        return result;
    };
}
