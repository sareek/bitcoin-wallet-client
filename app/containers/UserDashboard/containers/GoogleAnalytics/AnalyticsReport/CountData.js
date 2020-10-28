import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CountData = props => {
  const { data, title } = props;
  return (
    <Card>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Content extra>
          <a href="https://analytics.google.com" target="_blank">
            <Icon name="user" />
            {data}
          </a>
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default CountData;
