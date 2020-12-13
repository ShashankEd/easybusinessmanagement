import { APP_CONSTANTS, DB_KEYS } from "./constants";
import Snackbar from 'react-native-snackbar';
import {get as _get} from 'lodash';
import * as Keychain from 'react-native-keychain';
/**
 * Common wrapper function to show Snackbar
 * @param err : object : Error object of API error
 */
export function showSnackBar(err, nonApiError, type) {
    let priorityErrorMessage = '';
    if (Object.keys(err).length) {
      let key = Object.keys(_get(err, DB_KEYS.SNACKBAR_ERRORS, ''))[0];
      priorityErrorMessage = _get(err, DB_KEYS.SNACKBAR_ERRORS, '')[key];
    }
    return Snackbar.show({
      title: nonApiError
        ? nonApiError
        : type === APP_CONSTANTS.SCREEN_TYPE_FORM
        ? _get(err, DB_KEYS.ERROR_MESSAGE, APP_CONSTANTS.GENERAL_ERROR)
        : _get(err, DB_KEYS.ERROR_MESSAGE, APP_CONSTANTS.GENERAL_ERROR) +
         ( priorityErrorMessage === undefined ? priorityErrorMessage : ''),
      duration: Snackbar.LENGTH_LONG,
      action: {
        title: 'OK', //For any button title
        color: '#00C1A4',
        onPress: () => {
          /* Do something. */
        },
      },
    });
}
/**
 * Funtion to SET user authToken
 * @param token : string : user auth token
 * @param email : string : corresponding email of user
 */
export async function setAuthToken(token, email) {
  return new Promise((resolve, reject) => {
    const authToken = token;
    const userEmail = email;
    Keychain.setGenericPassword(userEmail, authToken)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
}

/**
 * Funtion to GET user authToken
 */
export async function getAuthToken() {
  return new Promise((resolve, reject) => {
    const userAuthToken = Keychain.getGenericPassword()
      .then(response => resolve(response.password))
      .catch(error => reject(Error));
  });
}

/**
 * Funtion to clear and reset user authToken
 */
export async function resetAuthToken() {
  return new Promise((resolve, reject) => {
    Keychain.resetGenericPassword()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}
