import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ACCOUNTS_ASYNC,
  SET_ACTIVE_CURRENCY_ASYNC,
  SEND_ASYNC,
  HIDE_MODAL,
  LOGOUT_USER_ASYNC,
} from './../actions/AccountsActions';
// import Big from 'big.js';
import * as Rehive from './../../util/rehive';

function* fetchAccounts() {
  try {
    response = yield call(Rehive.getAccounts);
    const accounts = response.results;
    let activeWalletIndex = 0;
    let currencies;
    let account;

    let showAccountLabel = false;

    // var wallets = _.flatten(_.flatten(accounts, 'users'));

    // console.log('1', _.flatten(accounts.results));

    // let wallets = _.map(accounts.results, function(account) {
    //   return _.flatten(account.currencies);
    // });

    // wallets.log('1', _.flatten(accounts));

    // _.map(currencies, 'user');

    // console.log(accounts);
    let wallets;
    let index = 0;
    for (var i = 0; i < accounts.length; i++) {
      account = accounts[i];
      currencies = account.currencies;
      for (var j = 0; j < currencies.length; j++) {
        if (!wallets) {
          wallets = [];
        }
        wallets[index] = {
          index,
          account_reference: account.reference,
          account_name: account.name,
          currency: currencies[j],
        };
        if (currencies[j].active === true) {
          activeWalletIndex = index;
        }
        index++;
      }
    }
    if (accounts.length > 1) {
      showAccountLabel = true;
    }
    const activeItem = wallets[activeWalletIndex];
    wallets[activeWalletIndex] = wallets[0];
    wallets[0] = activeItem;

    yield put({
      type: FETCH_ACCOUNTS_ASYNC.success,
      payload: { wallets, activeWalletIndex, showAccountLabel },
    });
  } catch (error) {
    if (error.status === 401) {
      yield put({
        type: LOGOUT_USER_ASYNC.success,
      });
    }
    yield put({ type: FETCH_ACCOUNTS_ASYNC.error, error });
  }
}

function* setActiveCurrency(action) {
  try {
    yield call(
      Rehive.setActiveCurrency,
      action.payload.account_reference,
      action.payload.currency.currency.code,
    );
    yield all([
      put({ type: SET_ACTIVE_CURRENCY_ASYNC.success }),
      put({ type: HIDE_MODAL }),
      put({ type: FETCH_ACCOUNTS_ASYNC.pending }),
    ]);
  } catch (error) {
    console.log(error);
    yield put({ type: SET_ACTIVE_CURRENCY_ASYNC.error, error });
  }
}

// function*

export const accountsSagas = all([
  takeEvery(FETCH_ACCOUNTS_ASYNC.pending, fetchAccounts),
  takeEvery(SEND_ASYNC.success, fetchAccounts),
  takeEvery(SET_ACTIVE_CURRENCY_ASYNC.pending, setActiveCurrency),
]);
