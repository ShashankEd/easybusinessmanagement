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
import {
    getAuthToken
} from '../../utils/helperFunction';

export class UnconnectedUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userList: []
        }
    }
    /**
     * Here we'll call the user list api 
     */
    componentDidMount = async() => {
        const token = await getAuthToken();
        const {getUserList} = this.props
        await getUserList({},{});
        const {getUserListResponse} = this.props;
        if(_get(getUserListResponse,DB_KEYS.DATA)) {
            this.setState({
                userList: _get(getUserListResponse,DB_KEYS.DATA)
            })
        }
    }
    render =() => {
        const {userList} = this.state;
        return(
            userList && 
            <SafeAreaView>
                <Text>User list</Text>
                <FlatList
                    style={{ marginTop: 40 }}
                    data={userList}
                    renderItem={({ item }) => (
                        <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                            <Text style={{ backgroundColor: 'blue', color: 'white', padding: 10, width: Dimensions.get('window').width }}>
                                {item.first_name +" "+ item.last_name}
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        )
    }   
}
const mapStateToProps = (state) => ({
    getUserListResponse: state.getUserList,
  });
  
  const bindActions = (dispatch  ) => ({
    getUserList: (param,qParam) => dispatch(getUserList.fetchCall(param,qParam)),
  });
  
  export const UserList = connect(
    mapStateToProps,
    bindActions,
  )(UnconnectedUserList);
