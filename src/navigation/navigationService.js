import 'react-native-gesture-handler';
import {NavigationActions, StackActions} from 'react-navigation';
import {NAVIGATION_SCREEN_NAME} from '../utils/constants';
const NAVIGATOR_CONFIG = {
    navigator: '',
  };
  
/**
 * Function to route along with Params
 * @param routeName : string : Navigation screen route name
 * @param params : object : Params to be passed upon navigation
 */
export function navigate(routeName, params) {
    if (NAVIGATOR_CONFIG.navigator && routeName) {
      const action = NavigationActions.navigate({routeName, params});
      NAVIGATOR_CONFIG.navigator.dispatch(action);
    }
}
/**
 * Function to create Navigation reference of AppFlow
 * @param nav : any : Navigation reference
 */
export function setNavigator(nav) {
    if (nav) {
      NAVIGATOR_CONFIG.navigator = nav;
    }
  }