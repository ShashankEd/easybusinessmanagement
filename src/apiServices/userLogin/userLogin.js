import apiConstants from '../../../config/apiConstants';
import {postRequest} from '../requestService';

const endPoint = apiConstants.API_END_POINTS.USER_LOGIN;
/**
 * Get the user list
 * @param body : object : payload for GET api call
 */

export function userLogin(body,qParam) {
  return postRequest(endPoint, body, qParam);
}
