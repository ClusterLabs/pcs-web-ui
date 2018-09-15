import React from 'react';
import {Button, Segment, Message, Icon} from 'semantic-ui-react'

const LoadDataProblem = ({retry, header, error}) => (
  <Segment clearing={true}>
    <Message negative icon>
      <Icon name="warning circle"/>
      <Message.Content>
        <Message.Header>{header}</Message.Header>
        {error.message}
      </Message.Content>
    </Message>
    <Button
      floated='right'
      icon='refresh'
      content="Try Again"
      onClick={() => retry()}
    />
  </Segment>
)

export default LoadDataProblem;
