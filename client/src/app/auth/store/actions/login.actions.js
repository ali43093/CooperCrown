import { authRoles } from 'app/auth';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
  return (dispatch) =>
    jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(UserActions.setUserData(user));

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
}

export function submitLoginWithFireBase({ username, password }) {
  if (!firebaseService.auth) {
    console.warn(
      "Firebase Service didn't initialize, check your configuration"
    );

    return () => false;
  }

  return (dispatch) =>
    firebaseService.auth
      .signInWithEmailAndPassword(username, password)
      .then((user) => {
        dispatch(
          UserActions.createUserSettingsFirebase({
            ...user
          })
        );
        dispatch(
          Actions.updateNavigationItem('Account-Setting', {
            title: 'Account Setting',
            type: 'item',
            auth: authRoles.staff,
            url: `/apps/AccountSetting/${user.uid}`,
            exact: true
          })
        );
        dispatch(
          Actions.updateNavigationItem('Security-And-Privacy', {
            title: 'Security And Privacy',
            type: 'item',
            auth: authRoles.staff,
            url: `/apps/SecurityAndPrivacy/${user.uid}`,
            exact: true
          })
        );
        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch((error) => {
        console.info('error');
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          username: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}
