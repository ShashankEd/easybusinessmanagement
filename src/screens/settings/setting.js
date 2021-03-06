import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList, Dimensions
} from 'react-native';
import {
    getUserList
} from '../../store/reducers/listUsers';
import {get as _get} from 'lodash';
import {connect} from 'react-redux';
import {
    DB_KEYS
} from '../../utils/constants/dbKeys';

export class UnconnectedSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userList: []
        }
    }
    render =() => {
        return(
            <SafeAreaView>
                <Text>Settings</Text>
            </SafeAreaView>
        )
    }   
}
const mapStateToProps = (state) => ({
    getUserListResponse: state.getUserList,
  });
  
  const bindActions = (dispatch  ) => ({
  });
  
  export const Setting = connect(
    mapStateToProps,
    bindActions,
  )(UnconnectedSetting);
