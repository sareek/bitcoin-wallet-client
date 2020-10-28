import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import { List, Segment } from 'semantic-ui-react';
import { FormattedRelative } from 'react-intl';

const SortableItem = SortableElement(({ value }) => (
  <Segment inverted style={{ position: FormattedRelative, zIndex: 9999 }}>
    <span>{value}</span>
  </Segment>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      {
        items: arrayMove(this.props.items, oldIndex, newIndex),
      },
      () => {
        this.props.getItems(this.state.items);
      },
    );
  };
  render() {
    return (
      <div>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

export default SortableComponent;
