/**
 * Created by lakhe on 7/22/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import updateHtmlEditorImage from 'containers/Globals/HtmlEditor/imageApiHelper';

class HTMLEditor extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  uploadCallback = file =>
    new Promise(resolve => {
      if (file) {
        file.preview = URL.createObjectURL(file);
        updateHtmlEditorImage(file)
          .then(res => res.json())
          .then(res => {
            const imageUrl = res && res.data && res.data.file_path ? res.data.file_path : '';
            resolve({ data: { link: imageUrl } });
          })
          .catch(err => {
            resolve({ data: { link: '' } });
          });
      }
    });

  render() {
    return (
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={this.props.editorState}
        onEditorStateChange={this.props.onEditorStateChange}
        onBlur={this.props.onBlur}
        toolbar={{
          image: {
            className: 'editor_uploader',
            uploadCallback: this.uploadCallback,
            urlEnabled: false
          }
        }}
        hashtag={{
          separator: ' ',
          trigger: '#',
          className: 'hashtag-className'
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: []
        }}
      />
    );
  }
}

HTMLEditor.propTypes = {};

export default HTMLEditor;
