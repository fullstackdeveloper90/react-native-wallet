import { select, take, all, call, put, takeEvery } from 'redux-saga/effects';
import {
  AUTH_FIELD_ERROR,
  LOGIN_USER_ASYNC,
  REGISTER_USER_ASYNC,
  UPDATE_AUTH_FORM_STATE,
  APP_LOAD_FINISH,
  CHANGE_PASSWORD_ASYNC,
  VALIDATE_COMPANY_ASYNC,
  RESET_PASSWORD_ASYNC,
  LOGOUT_USER_ASYNC,
  RESET_AUTH,
  NEXT_AUTH_FORM_STATE,
  INIT,
  PIN_SUCCESS,
  AUTH_COMPLETE,
  LOADING,
  SET_COMPANY,
  ACTIVATE_FINGERPRINT,
  SET_PIN,
  POST_LOADING,
  POST_NOT_LOADING,
} from './../actions/AuthActions';

import { FETCH_DATA_ASYNC } from './../actions/UserActions';
import { FETCH_ACCOUNTS_ASYNC } from './../actions/AccountsActions';

import * as Rehive from './../../util/rehive';
import NavigationService from './../../util/navigation';
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from './../../util/validation';
import default_config from './../../config/default_company_config';
import { getToken, getCompany, getAuth, getUser } from './selectors';

function* init() {
  console.log('init');
  let company_config;
  try {
    Rehive.initWithoutToken();
    try {
      const company = yield select(getCompany);
      if (company) {
        company_config = yield call(Rehive.getCompanyConfig, company);
        try {
          const token = yield select(getToken);
          if (token) {
            yield call(Rehive.verifyToken, token);
            yield call(Rehive.initWithToken, token);
            const { pin, fingerprint } = yield select(getAuth);
            console.log(pin, fingerprint);
            if (pin || fingerprint) {
              if (fingerprint) {
                yield call(goToAuth, 'pin', 'fingerprint');
              } else {
                yield call(goToAuth, 'pin', 'pin');
              }
              yield take(PIN_SUCCESS);
            }
            yield call(appLoad);
            // go to auth for pin/2FA/announcements when done
          } else {
            yield call(goToAuth, 'landing', 'landing');
          }
        } catch (error) {
          console.log('token error', error);
          yield call(goToAuth, 'landing', 'landing');
        }
      } else {
        yield call(goToAuth, 'company', 'company');
      }
    } catch (error) {
      console.log('company error', error);
      yield call(goToAuth, 'company', 'company');
    }
  } catch (error) {
    console.log('init error:', error);
    yield put({ type: INIT.error, error });
  }
}

function* goToAuth(mainState, detailState) {
  console.log('go to: ', mainState);
  try {
    yield put({
      type: UPDATE_AUTH_FORM_STATE,
      payload: { mainState, detailState },
    });
    yield put({ type: INIT.success });
    if (mainState !== 'pin') {
      yield call(authFlow);
    }
  } catch (error) {
    console.log(error);
  }
}

function* appLoad() {
  try {
    yield all([
      put({ type: POST_LOADING }),
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'profile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'mobile' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'email' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'crypto_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'address' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'document' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_bank_account' }),
      put({ type: FETCH_DATA_ASYNC.pending, payload: 'company_currency' }),
    ]);
    for (let i = 0; i < 11; i++) {
      yield take([FETCH_ACCOUNTS_ASYNC.success, FETCH_DATA_ASYNC.success]);
    }
    yield put({ type: APP_LOAD_FINISH });
    NavigationService.navigate('App');
  } catch (error) {
    console.log('appLoad', error);
    yield put({ type: LOGIN_USER_ASYNC.error, payload: error });
  }
}

function* authFlow() {
  try {
    let token = '';
    let user = {};
    while (true) {
      const action = yield take(NEXT_AUTH_FORM_STATE);
      const { nextFormState } = action.payload;
      console.log(nextFormState);
      const {
        mainState,
        detailState,
        tempCompany,
        company,
        email,
        mobile,
        password,
        first_name,
        last_name,
        country,
        company_config,
      } = yield select(getAuth);
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';
      let skip = false;

      // Decide which state to transition to next
      switch (mainState) {
        case 'company':
          try {
            yield put({ type: LOADING });
            yield call(Rehive.register, { company: tempCompany });
          } catch (error) {
            if (error.data.company) {
              authError = 'Please enter a valid company ID';
            } else {
              temp_config = yield call(Rehive.getCompanyConfig, tempCompany);
              temp_config = temp_config ? temp_config : default_config;
              yield put({
                type: SET_COMPANY,
                payload: { tempCompany, temp_config },
              });
              nextMainState = 'landing';
              nextDetailState = 'landing';
            }
          }
          break;
        case 'landing':
          nextMainState = nextFormState;
          nextDetailState = company_config.auth.identifier;
          break;
        case 'login':
          if (nextFormState === 'forgot') {
            nextMainState = 'forgot';
            nextDetailState = 'email';
          } else {
            switch (detailState) {
              case 'email':
                authError = validateEmail(email);
                if (!authError) {
                  nextDetailState = 'password';
                  user = email;
                }
                break;
              case 'mobile':
                authError = validateMobile(mobile);
                if (!authError) {
                  nextDetailState = 'password';
                  user = mobile;
                }
                break;
              case 'password':
                authError = validatePassword(password);
                if (!authError) {
                  data = { company, user, password };
                  try {
                    yield put({ type: LOADING });
                    ({ user, token } = yield call(Rehive.login, data));
                    yield call(Rehive.initWithToken, token);
                    if (yield call(postAuthFlow)) {
                      yield put({ type: AUTH_COMPLETE, payload: token });
                      return;
                    }
                    break;
                  } catch (error) {
                    authError = error.message;
                    nextDetailState = company_config.auth.identifier;
                  }
                }
                break;
            }
          }
          break;
        case 'register':
          switch (detailState) {
            case 'email':
              authError = validateEmail(email);
              if (!authError) {
                nextDetailState = 'password';
                user = email;
              }
              break;
            case 'mobile':
              authError = validateMobile(mobile);
              if (!authError) {
                nextDetailState = 'password';
                user = mobile;
              }
              break;
            case 'password':
              authError = validatePassword(password);
              if (!authError) {
                data = {
                  company,
                  email,
                  password1: password,
                  password2: password,
                };
                try {
                  yield put({ type: LOADING });
                  ({ user, token } = yield call(Rehive.register, data));
                  yield call(Rehive.initWithToken, token);
                  if (yield call(postAuthFlow)) {
                    yield put({ type: AUTH_COMPLETE, payload: token });
                    return;
                  }
                } catch (error) {
                  authError = error.message;
                  nextDetailState = company_config.auth.identifier;
                }
              }
              break;
          }
      }

      // execute transition
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          mainState: nextMainState,
          detailState: nextDetailState,
          authError,
          skip,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* postAuthFlow() {
  try {
    while (true) {
      // const action = yield take(NEXT_AUTH_FORM_STATE);
      // const { nextFormState } = action.payload;
      console.log('postAuthFlow');
      const {
        mainState,
        detailState,
        tempCompany,
        company,
        email,
        mobile,
        password,
        first_name,
        last_name,
        country,
        company_config,
      } = yield select(getAuth);
      let nextMainState = mainState;
      let nextDetailState = detailState;
      let authError = '';
      let skip = false;
      yield put({ type: POST_LOADING });

      // Decide which state to transition to next
      switch (mainState) {
        case 'login':
        case 'register':
          const mfa = yield call(Rehive.getMFA);
          nextMainState = 'mfa';
          if (mfa.token) {
            nextDetailState = 'token';
          } else if (mfa.sms) {
            nextDetailState = 'sms';
            // TODO: add call to get number that sms was sent to here
          } else {
            nextDetailState = '';
          }
          break;
        case 'mfa':
          yield put({ type: POST_NOT_LOADING });
          switch (detailState) {
            case 'token':
              // TODO: wait for next auth state action here
              // test token
              // if token pass put next state else stay here and reset
              break;
            case 'sms':
              // test sms
              // if sms pass put next state else stay here and reset
              break;
            default:
              nextMainState = 'verification';
              nextDetailState = 'mobile';
              if (company_config.auth.mobile === 'optional') {
                skip = true;
              }
          }
          break;
        case 'verification':
          switch (detailState) {
            case 'mobile':
              if (
                company_config.auth.mobile &&
                (yield call(Rehive.getMobiles)).filter(
                  item => item.verified === true,
                ).length === 0
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
              } else {
                nextDetailState = 'email';
                if (company_config.auth.email === 'optional') {
                  skip = true;
                }
              }
              break;
            case 'email':
              if (
                company_config.auth.email &&
                (yield call(Rehive.getEmails)).filter(
                  item => item.verified === true,
                ).length === 0
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
              } else {
                nextDetailState = 'first_name';
              }
              break;
            case 'first_name':
              if (
                company_config.auth.first_name &&
                !(yield call(Rehive.getProfile)).first_name
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { first_name } = yield select(getAuth);
                if (first_name) {
                  yield call(Rehive.updateProfile, { first_name });
                }
              } else {
                nextDetailState = 'last_name';
              }
              break;
            case 'last_name':
              if (
                company_config.auth.last_name &&
                !(yield call(Rehive.getProfile)).last_name
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { last_name } = yield select(getAuth);
                if (last_name) {
                  yield call(Rehive.updateProfile, { last_name });
                }
              } else {
                nextDetailState = 'country';
              }
              break;
            case 'country':
              if (
                company_config.auth.country &&
                !(yield call(Rehive.getProfile)).country
              ) {
                yield put({ type: POST_NOT_LOADING });
                yield take(NEXT_AUTH_FORM_STATE);
                const { country } = yield select(getAuth);
                if (country) {
                  yield call(Rehive.updateProfile, { country });
                }
              } else {
                nextMainState = 'pin';
                nextDetailState = 'set_pin';
                if (Expo.Fingerprint.hasHardwareAsync()) {
                  if (Expo.Fingerprint.isEnrolledAsync()) {
                    nextDetailState = 'set_fingerprint';
                  }
                }
                if (company_config.auth.pin === 'optional') {
                  skip = true;
                }
              }
              break;
          }
          break;
        case 'pin':
          if (company_config.auth.pin) {
            console.log('pin');
            let response;
            yield put({ type: POST_NOT_LOADING });
            switch (detailState) {
              case 'set_fingerprint':
                response = yield take([
                  NEXT_AUTH_FORM_STATE,
                  ACTIVATE_FINGERPRINT,
                ]);
                if (response.type === ACTIVATE_FINGERPRINT) {
                  return true;
                } else {
                  if (response.payload.nextFormState === 'skip') {
                    return true;
                  }
                  nextDetailState = 'set_pin';
                }
                break;
              case 'set_pin':
                response = yield take(NEXT_AUTH_FORM_STATE);
                nextDetailState = 'confirm_pin';
                break;
              case 'confirm_pin':
                response = yield take([SET_PIN, NEXT_AUTH_FORM_STATE]);
                if (response.type === SET_PIN) {
                  return true;
                } else {
                  nextDetailState = 'set_pin';
                  authError = 'Pin and confirm do not match, please try again';
                }
            }
          } else {
            return true;
          }
          break;
        // case 'default':
        //   return true;
      }
      yield put({ type: POST_LOADING });

      // execute transition
      yield put({
        type: UPDATE_AUTH_FORM_STATE,
        payload: {
          mainState: nextMainState,
          detailState: nextDetailState,
          authError,
          skip,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* logoutUser() {
  try {
    yield call(Rehive.logout);
    yield put({
      type: LOGOUT_USER_ASYNC.success,
    });
    yield call(NavigationService.navigate, 'AuthScreen');
    yield call(init);
  } catch (error) {
    console.log(error);
    yield put({ type: LOGOUT_USER_ASYNC.error, payload: error });
  }
}

function* changePassword(action) {
  try {
    yield call(Rehive.changePassword, action.payload);
    yield put({
      type: CHANGE_PASSWORD_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: CHANGE_PASSWORD_ASYNC.error, error });
  }
}

function* resetPassword(action) {
  try {
    yield call(Rehive.resetPassword, action.payload);
    yield put({
      type: RESET_PASSWORD_ASYNC.success,
    });
  } catch (error) {
    console.log(error);
    yield put({ type: RESET_PASSWORD_ASYNC.error, payload: error.message });
  }
}

export const authSagas = all([
  takeEvery(INIT.pending, init),
  takeEvery(LOGIN_USER_ASYNC.success, postAuthFlow),
  takeEvery(REGISTER_USER_ASYNC.success, postAuthFlow),
  takeEvery(AUTH_COMPLETE, appLoad),
  takeEvery(CHANGE_PASSWORD_ASYNC.pending, changePassword),
  takeEvery(LOGOUT_USER_ASYNC.pending, logoutUser),
  takeEvery(RESET_PASSWORD_ASYNC.pending, resetPassword),
]);
