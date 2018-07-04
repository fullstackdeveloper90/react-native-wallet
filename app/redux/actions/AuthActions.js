/* AUTH ACTIONS */

/* 
This file contains all the TYPE declarations and ACTION functions 
that relate to the auth flows
*/
import { authValidation } from './../../util/validation';
import { createAsyncTypes } from './../store/Utilities';

export const INIT = createAsyncTypes('init');
export const init = () => {
  return {
    type: INIT.pending,
  };
};

export const APP_LOAD_START = 'APP_LOAD_START';
export const APP_LOAD_FINISH = 'APP_LOAD_FINISH';
export const initialLoad = props => async dispatch => {
  dispatch({ type: APP_LOAD_START });

  if (props.token) {
    dispatch({ type: LOGIN_USER_ASYNC.success, payload: props.token });
  } else {
    dispatch({
      type: AUTH_FIELD_ERROR,
      payload: '',
    });
    if (props.company) {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          iconHeaderLeft: 'arrow-back',
          mainState: 'landing',
        },
      });
    } else {
      dispatch({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          textFooterRight: 'Next',
          mainState: 'company',
          detailState: 'company',
        },
      });
    }
  }
};

export const AUTH_FIELD_CHANGED = 'auth_field_changed';
export const authFieldChange = ({ prop, value }) => {
  return {
    type: AUTH_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const AUTH_FIELD_ERROR = 'auth_field_error';
export const LOGIN_USER_ASYNC = createAsyncTypes('login_user');
export const REGISTER_USER_ASYNC = createAsyncTypes('register_user');
export const VALIDATE_COMPANY_ASYNC = createAsyncTypes('validate_company');
export const UPDATE_AUTH_FORM_STATE = 'update_auth_form_state';
export const NEXT_AUTH_FORM_STATE = 'next_auth_form_state';
export const AUTH_COMPLETE = 'auth_complete';
export const LOADING = 'loading';
export const POST_LOADING = 'post_loading';
export const POST_NOT_LOADING = 'post_not_loading';
export const SET_COMPANY = 'set_company';
export const nextAuthFormState = nextFormState => {
  return {
    type: NEXT_AUTH_FORM_STATE,
    payload: { nextFormState },
  };
};
export const previousAuthFormState = props => {
  const { mainState, detailState } = props;

  let nextMainState = mainState;
  let nextDetailState = '';

  switch (mainState) {
    case 'landing':
      nextMainState = 'company';
      nextDetailState = 'company';
      break;
    case 'forgot':
      nextMainState = 'login';
      nextDetailState = 'email';
      break;
    case 'login':
    case 'register':
      switch (detailState) {
        case 'email':
          nextMainState = 'landing';
          break;
        case 'password':
          nextDetailState = 'email';
          break;
      }
      break;
    default:
      nextMainState = 'company';
      nextDetailState = 'company';
  }
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      detailState: nextDetailState,
      mainState: nextMainState,
    },
  };
};

export const CHANGE_PASSWORD_ASYNC = createAsyncTypes('change_password');
export const changePassword = (old_password, new_password) => {
  // console.log(old_password, new_password);
  if (!old_password || old_password.length < 8) {
    error = 'Password must be at least 8 characters in length';
    return {
      type: AUTH_FIELD_ERROR,
      payload: {
        prop: 'old_password',
        error,
      },
    };
  }

  if (!new_password || new_password.length < 8) {
    error = 'Password must be at least 8 characters in length';
    return {
      type: AUTH_FIELD_ERROR,
      payload: {
        prop: 'new_password',
        error,
      },
    };
  }

  return {
    type: CHANGE_PASSWORD_ASYNC.pending,
    payload: {
      old_password,
      new_password1: new_password,
      new_password2: new_password,
    },
  };
};

export const RESET_PASSWORD_ASYNC = createAsyncTypes('reset_password');
export const resetPassword = (company, email) => {
  return {
    type: RESET_PASSWORD_ASYNC.pending,
    payload: { user: email, company },
  };
};

export const LOGOUT_USER_ASYNC = createAsyncTypes('logout_user');
export const logoutUser = () => {
  return {
    type: LOGOUT_USER_ASYNC.pending,
  };
};

export const RESET_AUTH = 'reset_auth';
export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

export const PIN_SUCCESS = 'pin_success';
export const pinSuccess = () => {
  return {
    type: PIN_SUCCESS,
  };
};

export const PIN_FAIL = 'pin_fail';
export const pinFail = error => {
  return {
    type: PIN_FAIL,
    payload: error,
  };
};

export const SET_PIN = 'set_pin';
export const setPin = pin => {
  return {
    type: SET_PIN,
    payload: pin,
  };
};

export const SHOW_FINGERPRINT_MODAL = 'show_fingerprint_modal';
export const showFingerprintModal = () => {
  return {
    type: SHOW_FINGERPRINT_MODAL,
  };
};

export const ACTIVATE_FINGERPRINT = 'activate_fingerprint';
export const activateFingerprint = () => {
  return {
    type: ACTIVATE_FINGERPRINT,
  };
};

export const RESET_PIN = 'reset_pin';
export const resetPin = () => {
  return {
    type: RESET_PIN,
  };
};
