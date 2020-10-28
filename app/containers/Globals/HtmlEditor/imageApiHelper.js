/**
 * Created by lakhe on 7/22/17.
 */
import { API } from 'containers/App/sagas';

const token = localStorage.getItem('token');

export default function updateHtmlEditorImage(file) {
  return API.multipartDirectUpload('api/html-editor/file', {}, file, token);
}
