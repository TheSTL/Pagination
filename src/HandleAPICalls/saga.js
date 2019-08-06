import axios from 'axios';
import { takeEvery, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { HANDLE_API_CALLS } from './constants';


// function that makes the api request and returns a Promise for response
function callToAPI(method, url, data) {
  // console.log(params);
  axios.defaults.headers.common['x-auth-token']='eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibW9iaWxlIjoiODcwMDUyMzkxMCIsImlhdCI6MTU2NTAwNTAxNiwiZXhwIjoxNTY1MDkxNDE2fQ.n-IRaXAkNpNQIHKM-bq2P34uox4g4BVlAhg2pvz5zqNiFEZEdsF1CcYXSOSjvsHF'
  return axios({
    method,
    url,
    data,
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* handleAPICalls(action) {
  try {
    const response = yield call(callToAPI, action.method, action.url, action.body);  
    console.log(response);
    
    
    if (action.handleSuccess) {
      yield call(action.handleSuccess, response.data);
    }

  } catch (err) {
    console.log(err);
    if (!action.showToast) {
      toastr.error('ERROR', 'Failed to request');
    }
    if (action.handleError) {
      yield call(action.handleError, err.response);
    }
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* callToAPIWatcher() {
  yield takeEvery(HANDLE_API_CALLS, handleAPICalls);
}

/* eslint-disable */
export {
  callToAPIWatcher,
};

/* eslint-enable */
