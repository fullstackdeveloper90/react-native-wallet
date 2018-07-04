import {
  INPUT_FIELD_CHANGED,
  INPUT_FIELD_ERROR,
  FETCH_DATA_ASYNC,
  NEW_ITEM,
  EDIT_ITEM,
  UPDATE_ASYNC,
  CONFIRM_DELETE_ASYNC,
  DELETE_ITEM,
  RESEND_VERIFICATION_ASYNC,
  VERIFY_ASYNC,
  PRIMARY_ITEM,
  CARD_DISMISS,
  CARD_RESTORE_ALL,
  UPLOAD_DOCUMENT_ASYNC,
  SHOW_MODAL,
  HIDE_MODAL,
} from './../actions/UserActions';
import { LOGOUT_USER, SET_COMPANY } from './../actions/AuthActions';
import { VIEW_WALLET, HIDE_WALLET } from './../actions/AccountsActions';

import { PERSIST_REHYDRATE } from 'redux-persist/es/constants';

const EMPTY_BANK_ACCOUNT = {
  name: '',
  number: '',
  type: '',
  bank_name: '',
  bank_code: '',
  branch_code: '',
  swift: '',
  iban: '',
  bic: '',
};

const EMPTY_PROFILE = {
  first_name: '',
  last_name: '',
  id_number: '',
  nationality: '',
  profile: '',
};

const EMPTY_MOBILE = { number: '', primary: false };

const EMPTY_EMAIL = { email: '', primary: false };

const EMPTY_CRYPTO = { address: '', crypto_type: '' };

const EMPTY_ADDRESS = {
  line_1: '',
  line_2: '',
  city: '',
  state_province: '',
  country: 'US',
  postal_code: '',
};

const INITIAL_STATE = {
  refreshing_profile: false,
  profile: {},
  email_address: [],
  mobile_number: [],
  address: null,
  document: {},
  bank_account: [],
  crypto_account: [],
  company: [],
  company_bank_account: [],
  company_currency: [],

  tempItem: {},

  showDetail: false,
  wallet: false,
  modalVisible: false,
  modalType: '',

  loading: false,
  updateError: '',
  fetchError: '',

  dismissedCards: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.auth || [];
    case INPUT_FIELD_CHANGED:
      return {
        ...state,
        tempItem: {
          ...state.tempItem,
          [action.payload.prop]: action.payload.value,
        },
      };

    case NEW_ITEM:
      return {
        ...state,
        // [action.payload.type]: {},
        tempItem: {},
        showDetail: true,
        editing: false,
      };
    case EDIT_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        showDetail: true,
        editing: true,
        wallet: false,
        modalType: '',
        updateError: '',
      };
    case PRIMARY_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: false,
        updateError: '',
        modalType: 'primary',
        modalVisible: true,
      };
    case UPDATE_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASYNC.success:
      return {
        ...state,
        tempItem: {},
        loading: false,
        updateError: '',
        modalType: '',
        modalVisible: false,
      };
    case UPDATE_ASYNC.error:
      return {
        ...state,
        loading: false,
        updateError: action.payload,
      };

    case DELETE_ITEM:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: false,
        updateError: '',
        modalType: 'delete',
        modalVisible: true,
      };
    case CONFIRM_DELETE_ASYNC.pending:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_DELETE_ASYNC.success:
      return {
        ...state,
        loading: false,
        modalVisible: false,
      };
    case CONFIRM_DELETE_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case RESEND_VERIFICATION_ASYNC.pending:
      return {
        ...state,
        tempItem: action.payload.data,
        loading: true,
        updateError: '',
      };
    case RESEND_VERIFICATION_ASYNC.success:
      return {
        ...state,
        modalVisible: true,
        modalType: 'verify',
        loading: false,
      };
    case RESEND_VERIFICATION_ASYNC.error:
      return {
        ...state,
        loading: false,
        modalVisible: true,
        modalType: 'verify',
        updateError: action.payload,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalVisible: false,
        loading: false,
        updateError: '',
        modalType: '',
      };
    case SHOW_MODAL:
      console.log('Not handled: ' + SHOW_MODAL);
      break;
    // return {
    //   ...state,
    //   [action.payload.type]: action.payload.data,
    //   modalType: action.payload.modalType,
    //   modalVisible: true,
    //   loading: false,
    //   updateError: '',
    // };

    case VERIFY_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
      };
    case VERIFY_ASYNC.success:
      return {
        ...state,
        loading: false,
        modalVisible: false,
        modalType: '',
      };
    case VERIFY_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case FETCH_DATA_ASYNC.pending:
      return {
        ...state,
        loading: true,
        showDetail: false,
        modalVisible: false,
        modalType: '',
      };
    case FETCH_DATA_ASYNC.success:
      return {
        ...state,
        [action.payload.prop]: action.payload.data,
        loading: false,
      };
    case FETCH_DATA_ASYNC.error:
      return {
        ...state,
        loading: false,
        fetchError: error,
      };

    case UPLOAD_DOCUMENT_ASYNC.pending:
      return {
        ...state,
        loading: true,
        updateError: '',
      };
    case UPLOAD_DOCUMENT_ASYNC.success:
      return {
        ...state,
        loading: false,
        // modalVisible: true,
        // modalType: 'verify',
      };
    case UPLOAD_DOCUMENT_ASYNC.error:
      return {
        ...state,
        updateError: action.payload,
        loading: false,
      };

    case VIEW_WALLET:
      return {
        ...state,
        showDetail: true,
        wallet: true,
      };
    case HIDE_WALLET:
      return {
        ...state,
        wallet: false,
        showDetail: false,
      };

    case CARD_DISMISS:
      return {
        ...state,
        dismissedCards: state.dismissedCards
          ? [...state.dismissedCards, action.payload]
          : [action.payload],
      };
    case CARD_RESTORE_ALL:
      return {
        ...state,
        dismissedCards: [],
      };

    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
