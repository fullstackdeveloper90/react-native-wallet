///////////////////
// ActionHelpers //
///////////////////
const asyncTypes = {
  pending: 'pending',
  success: 'success',
  error: 'error',
};
export const createAsyncTypes = typeString =>
  Object.values(asyncTypes).reduce((acc, curr) => {
    // console.log('curr', curr);
    acc[curr] = `${typeString}_${curr}`;
    // console.log('acc', acc);
    return acc;
  }, {});

export const createAction = (type, payload = {}) => ({ type, ...payload });

///////////////////
// createReducer //
///////////////////
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;
