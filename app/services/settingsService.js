import BaseService from './baseService';

var settingsService = {
  getAllBankAccounts: () => {
    return BaseService.get('user/bank-accounts/');
  },

  addBankAccount: data => {
    return BaseService.post('user/bank-accounts/', data);
  },

  editBankAccount: (id, data) => {
    return BaseService.patch('user/bank-accounts/' + id + '/', data);
  },

  getAllCryptoAddresses: () => {
    return BaseService.get('user/crypto-accounts/');
  },

  addCryptoAddresses: data => {
    return BaseService.post('user/crypto-accounts/', data);
  },

  editCryptoAddresses: (id, data) => {
    return BaseService.patch('user/crypto-accounts/' + id + '/', data);
  },

  getAllMobiles: () => {
    return BaseService.get('user/mobiles/');
  },

  addMobile: data => {
    return BaseService.post('user/mobiles/', data);
  },

  makeMobilePrimary: (id, data) => {
    return BaseService.patch('user/mobiles/' + id + '/', data);
  },

  verifyMobile: otp => {
    var data = { otp };
    return BaseService.post('auth/mobile/verify/', data);
  },

  resendMobileVerification: data => {
    return BaseService.post('auth/mobile/verify/resend/', data);
  },

  deleteMobile: id => {
    return BaseService.delete('user/mobiles/' + id + '/');
  },

  getAllEmails: () => {
    return BaseService.get('user/emails/');
  },

  addEmail: data => {
    return BaseService.post('user/emails/', data);
  },

  makeEmailPrimary: (id, data) => {
    return BaseService.patch('user/emails/' + id + '/', data);
  },

  resendEmailVerification: data => {
    // console.log(data);
    return BaseService.post('auth/email/verify/resend/', data);
  },

  deleteEmail: id => {
    return BaseService.delete('user/emails/' + id + '/');
  },

  deleteCryptoAddress: id => {
    return BaseService.delete('user/crypto-accounts/' + id + '/');
  },

  deleteBankAccount: id => {
    return BaseService.delete('user/bank-accounts/' + id + '/');
  },

  getAllNotifications: () => {
    return BaseService.get('user/notifications/');
  },

  changeStateOfNotification: (id, data) => {
    return BaseService.patch('user/notifications/' + id + '/', data);
  },

  documentUpload: (file, category, type) => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('document_category', category);
    formData.append('document_type', type);
    console.log(formData);
    return BaseService.documentUpload('user/documents/', formData);
  },
};

export default settingsService;
