import apiConstants from '../../../config/apiConstants';
import {getRequest} from '../requestService';

const endPoint = apiConstants.API_END_POINTS.LIST_USERS;
/**
 * Get the user list
 * @param body : object : payload for GET api call
 */

export function getUserList(body,qParam) {
  return getRequest(endPoint, body, qParam);
}
