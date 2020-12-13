import {getUserList as getApi} from '../../../apiServices';
import {StoreFetchableData} from '../base';
import {showSnackBar} from '../../../utils';

class getUserListData extends StoreFetchableData {
  constructor() {
    super('getUserList', getApi);
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
export var getUserList = new getUserListData();
