import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput, TouchableOpacity, Platform
} from 'react-native';
import {
    userLogin
} from '../../store/reducers';
import {get as _get} from 'lodash';
import {connect} from 'react-redux';
import {
    DB_KEYS
} from '../../utils/constants/dbKeys';
import {styles} from './styles';
import {navigation} from 'react-navigation';
import { showSnackBar } from '../../utils';
import { NAVIGATION_SCREEN_NAME,APP_CONSTANTS } from '../../utils/constants';
import {
    setAuthToken,
    getAuthToken
} from '../../utils/helperFunction';
import crashlytics from '@react-native-firebase/crashlytics';
export class UnconnectedUserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            email:'',
            password:'',
            tokenPresent: false
        }
    }

    /**
     * Temporary condition where i am checking if the token is present then navigating to the 
     * tab otherwise the login will be displayed
     */
    componentDidMount = async() => {
        const token = await getAuthToken();
        console.log("Token in login ", token);
        if(token) {
            this.handleStageNavigation(
                NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR_SCREEN,
                {},
              );
        }
    }

   /**
   * Decision function to set target_navigation
   * @param routeName : string : Target screen for navigation
   * @param taskAndStageId : object : Object with task_id & stage_id as navigation_params
   */
    handleStageNavigation = (routeName, taskAndStageId) => {
        setTimeout(
        () => this.props.navigation.navigate(routeName, taskAndStageId),
        APP_CONSTANTS.SWIPE_DOWN_ANIMATION_DELAY,
        );
    };
    /**
     * Method to check the user login validation and navigate to user list 
     */
    loginUser = async() => {
        const {
            email,
            password
        } = this.state;
        console.log("login user called");
        if(email && password) {
            const {userLogin} = this.props
            const payload = {
                /**
                 * Test credentials, case sensitive
                    "email": "eve.holt@reqres.in",
                    "password": "cityslicka"
                 */
                email: email,
                password: password
            }
            await userLogin(payload,{});
            const {userLoginResponse,navigation} = this.props;
            if(_get(userLoginResponse,DB_KEYS.RESPONSE)) {
                console.log("Token",_get(userLoginResponse,DB_KEYS.ACCESS_TOKEN));
                //set token to the keychain
                setAuthToken(_get(userLoginResponse,DB_KEYS.ACCESS_TOKEN),email)
                //navigate to user list
                this.handleStageNavigation(
                    NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR_SCREEN,
                    {email:email },
                  );

            }
        } else {
            // crashlytics().crash(); 
            showSnackBar('Enter values')
        }
    }
    render =() => {
        return(
            <View style={{marginTop:150, marginLeft: 80}}>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Email..." 
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({email:text})}/>
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Password..." 
                        placeholderTextColor="white"
                        onChangeText={text => this.setState({password:text})}/>
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginUser()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }   
}
const mapStateToProps = (state) => ({
    userLoginResponse: state.userLogin
  });
  
  const bindActions = (dispatch  ) => ({
    userLogin: (param,qParam) => dispatch(userLogin.fetchCall(param,qParam)),
  });
  
  export const UserLogin = connect(
    mapStateToProps,
    bindActions,
  )(UnconnectedUserLogin);
