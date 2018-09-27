import React from "react";
import { Message, List, Transition } from "semantic-ui-react";

const Notification = ({
  type,
  actions,
  id,
  message,
}) => (
  <Message
    {...{ [type.toLowerCase()]: true }}
    size="tiny"
    onDismiss={() => actions.destroy(id)}
  >
    {message}
  </Message>
);

const NotificationContainer = ({ notifications, actions }) => (
  <Transition.Group id="Notifications" as={List} duration={250}>
    {notifications.map(({ id, type, message }) => (
      <List.Item key={id}>
        <Notification
          id={id}
          type={type}
          actions={actions}
          message={message}
        />
      </List.Item>
    ))}
  </Transition.Group>
);

export default NotificationContainer;
