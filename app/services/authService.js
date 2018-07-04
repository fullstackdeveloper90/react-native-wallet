import BaseService from './baseService';

var authService = {
  login: data => {
    return BaseService.post('auth/login/', data);
  },

  signup: data => {
    return BaseService.post('auth/register/', data);
  },

  logout: () => {
    return BaseService.postWithoutBody('auth/logout/');
  },

  forgotPassword: data => {
    return BaseService.post('auth/password/reset/', data);
  },

  changePassword: data => {
    return BaseService.post('auth/password/change/', data);
  },
  twoFactorAuth: () => {
    return BaseService.get('auth/mfa/');
  },
  smsAuthGet: () => {
    return BaseService.get('auth/mfa/sms/');
  },
  smsAuthPost: data => {
    return BaseService.post('auth/mfa/sms/', data);
  },
  authOptionDelete: () => {
    return BaseService.delete('auth/mfa/sms/');
  },
  authTokenDelete: () => {
    return BaseService.delete('auth/mfa/token/');
  },
  tokenAuthGet: () => {
    return BaseService.get('auth/mfa/token/');
  },
  tokenAuthPost: data => {
    return BaseService.post('auth/mfa/token/', {});
  },
  authVerify: data => {
    return BaseService.post('auth/mfa/verify/', data);
  },
};

export default authService;
