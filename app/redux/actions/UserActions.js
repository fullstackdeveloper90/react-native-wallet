/* USER ACTIONS */

/* 
This file contains all the TYPE declarations and ACTION functions 
that relate to the user profile / information
*/

import { createAsyncTypes } from './../store/Utilities';

export const INPUT_FIELD_CHANGED = 'input_field_changed';
export const INPUT_FIELD_ERROR = 'input_field_error';
export const updateInputField = (type, prop, value) => {
  return {
    type: INPUT_FIELD_CHANGED,
    payload: { type, prop, value },
  };
};

export const FETCH_DATA_ASYNC = createAsyncTypes('fetch_data');
export const fetchData = prop => {
  return { type: FETCH_DATA_ASYNC.pending, payload: prop };
};

export const REFRESH_PROFILE_ASYNC = createAsyncTypes('refresh_profile');
export const refreshGetVerified = () => {
  return { type: REFRESH_PROFILE_ASYNC.pending };
};

export const NEW_ITEM = 'new_item';
export const newItem = type => {
  return {
    type: NEW_ITEM,
    payload: { type },
  };
};

export const EDIT_ITEM = 'edit_item';
export const editItem = (type, item) => {
  return {
    type: EDIT_ITEM,
    payload: { type, data: item },
  };
};

export const PRIMARY_ITEM = 'primary_item';
export const primaryItem = (type, item) => {
  return {
    type: PRIMARY_ITEM,
    payload: { type, data: { ...item, primary: true } },
  };
};

export const UPDATE_ASYNC = createAsyncTypes('update');
export const updateItem = (type, data) => {
  return {
    type: UPDATE_ASYNC.pending,
    payload: { type, data },
  };
};

export const DELETE_ITEM = 'delete_item';
export const deleteItem = (type, item) => {
  return {
    type: DELETE_ITEM,
    payload: { type, data: item },
  };
};

export const CONFIRM_DELETE_ASYNC = createAsyncTypes('confirm_delete');
export const confirmDeleteItem = (type, item) => {
  return {
    type: CONFIRM_DELETE_ASYNC.pending,
    payload: { type, data: item },
  };
};

export const RESEND_VERIFICATION_ASYNC = createAsyncTypes(
  'resend_verification',
);
export const resendVerification = (type, data, company) => {
  // console.log(type, value);
  return {
    type: RESEND_VERIFICATION_ASYNC.pending,
    payload: {
      type,
      data,
      company,
    },
  };
};

export const VERIFY_ASYNC = createAsyncTypes('verify');
export const verifyItem = (type, otp) => {
  // console.log(type, value);
  return {
    type: VERIFY_ASYNC.pending,
    payload: {
      type,
      otp,
    },
  };
};

export const SHOW_MODAL = 'show_modal';
export const showModal = (type, item, modalType) => {
  // console.log('item', item);
  return {
    type: SHOW_MODAL,
    payload: { type: 'temp_' + type, data: item, modalType },
  };
};

export const HIDE_MODAL = 'hide_modal';
export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const UPLOAD_PROFILE_PHOTO_ASYNC = createAsyncTypes(
  'upload_profile_photo',
);
export const uploadProfilePhoto = image => {
  const file = {
    uri: image,
    name: 'profile',
    type: 'image/jpg',
  };
  return {
    type: UPLOAD_PROFILE_PHOTO_ASYNC.pending,
    payload: file,
  };
};

export const UPLOAD_DOCUMENT_ASYNC = createAsyncTypes('upload_document');
export const uploadDocument = (image, category, document_type) => {
  const parts = image.split('/');
  const name = parts[parts.length - 1];
  const file = {
    uri: image,
    name,
    type: 'image/jpg',
  };
  return {
    type: UPLOAD_DOCUMENT_ASYNC.pending,
    payload: {
      file,
      category,
      type: document_type,
    },
  };
};

export const CARD_DISMISS = 'card_dismiss';
export const cardDismiss = card_id => {
  return {
    type: CARD_DISMISS,
    payload: card_id,
  };
};

export const CARD_RESTORE_ALL = 'card_restore_all';
export const cardRestoreAll = () => {
  return {
    type: CARD_RESTORE_ALL,
  };
};
