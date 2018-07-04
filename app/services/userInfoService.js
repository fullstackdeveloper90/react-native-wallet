import BaseService from './baseService';

var UserInfoService = {
  getCompany: () => {
    return BaseService.get('company/');
  },

  getAllCompanyCurrencies: () => {
    return BaseService.get('company/currencies/');
  },

  getDepositInfo: () => {
    return BaseService.get('company/bank-accounts/');
  },

  getActiveAccount: () => {
    return BaseService.get('accounts/?active=true');
  },

  getAddress: () => {
    return BaseService.get('user/address/');
  },

  updateAddress: data => {
    return BaseService.patch('user/address/', data);
  },

  getUserDetails: () => {
    return BaseService.get('user/');
  },

  updateUserDetails: data => {
    return BaseService.patch('user/', data);
  },

  uploadProfileImage: file => {
    let formData = new FormData();
    formData.append('profile', file);
    return BaseService.fileUpload('user/', formData);
  },
  getAllDocuments: () => {
    return BaseService.get('user/documents/');
  },
};

export default UserInfoService;
