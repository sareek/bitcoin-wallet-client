import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

export const getInitialStateFromHTMLValue = value => {
  let editorState;
  if (value) {
    const blocksFromHtml = htmlToDraft(value);
    // const { contentBlocks, entityMap } = ;
    const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
    editorState = EditorState.createWithContent(contentState);
  } else {
    editorState = EditorState.createEmpty('');
  }

  return editorState;
};

export const setUpdatedStateToHTMLValue = editorState => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  // const hashConfig = {
  //   trigger: '#',
  //   separator: ' '
  // };
  return draftToHtml(rawContentState);
};
