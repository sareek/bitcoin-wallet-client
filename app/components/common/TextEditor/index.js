import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINY_MCE_API_KEY } from '../../../containers/App/constants';
class TextEditor extends React.Component {
  state = {};
  renderTiny = () => {
    this.setState({ render: true });
  };

  componentDidMount() {
    // let url = this.props.urlAction;
    // url = url.split('/');
    if (this.props.urlAction == 'create') {
      this.setState({ render: true });
    }
  }
  componentWillUnmount() {
    this.setState(state => {});
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.data) {
      return { data: nextProps.data, render: true };
    }
    return null;
  }

  render() {
    const { render, data } = this.state;
    return (
      <div>
        {render && (
          <Editor
            apiKey={TINY_MCE_API_KEY}
            initialValue={this.props.data || ''}
            id={
              (this.props.id && this.props.id) ||
              'tiny-react_15995242871552286004869'
            }
            init={{
              plugins:
                'link paste imagetools table image code preview media advlist',
              toolbar:
                'undo redo | bold italic underline |  alignleft aligncenter alignright | code | image | forecolor backcolor | preview ',
            }}
            onChange={this.props.handleEditorChange}
          />
        )}
      </div>
    );
  }
}

export default TextEditor;
