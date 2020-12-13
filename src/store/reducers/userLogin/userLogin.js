import {userLogin as postApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar} from '../../../utils';

class userLoginData extends StoreFetchableData {
  constructor() {
    super('userLogin', postApi);
  }
  fetchCall(data, moreData) {
    return dispatch =>
      dispatch(this.actions.fetch()) &&
      this.fetchData(data, moreData)
        .then((res) => {
          dispatch(this.actions.response(res));
        })
        .catch((err) => {
          dispatch(this.actions.error(err));
          showSnackBar(err);
        });
  }
}
export var userLogin = new userLoginData();
