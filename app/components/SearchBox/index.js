import React from 'react';
import { Input } from 'semantic-ui-react';

const searchItems = (event, props) => {
  props.searchItems(event.target.value);
};

const SearchBox = props => {
  const { text } = props;
  const newText = text ? 'Search By ' + text : 'Search...';
  return (
    <Input
      placeholder={newText}
      onChange={event => searchItems(event, props)}
    />
  );
};

export default SearchBox;
