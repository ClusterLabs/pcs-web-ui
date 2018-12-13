import React from "react";
import {
  Form, Checkbox, Button, Message,
} from "semantic-ui-react";
import isPort from "validator/lib/isPort";
import isEmpty from "validator/lib/isEmpty";


class ClusterNodeAddForm extends React.Component {
  state = {
    visited: {
      nodename: false,
      pcsdport: false,
      password: false,
      autoOn: false,
    },
    form: {
      nodename: "",
      pcsdport: "",
      password: "",
      autoOn: false,
    },
    errors: {
      pcsdport: [],
      nodename: [],
    },
  }

  validators = {
    nodename: (value) => {
      const errors = [];
      if (isEmpty(value)) {
        errors.push("Node name cannot be empty");
      }
      return errors;
    },
    pcsdport: (value) => {
      const errors = [];
      if (!isEmpty(value) && !isPort(value)) {
        errors.push(`${value} is not valid port`);
      }
      return errors;
    },
  }

  nodeChanged = (event, { name, value }) => {
    const { actions, clusterNodeAdd } = this.props;
    const { form } = this.state;
    let keepPassword = false;
    if (clusterNodeAdd.authRequired) {
      actions.stopReuireAuthDataChanged();
      keepPassword = true;
    }

    const formNext = {
      ...form,
      [name]: value,
      password: keepPassword ? form.password : "",
    };

    const errors = this.validate(formNext, name);
    this.setState({ form: formNext, errors });
  }

  setVisited = (name) => {
    const { visited } = this.state;
    this.setState({ visited: { ...visited, [name]: true } });
  }

  validate = (form, currentField = undefined) => {
    const { visited } = this.state;
    return Object.keys(form).reduce(
      (errors, field) => {
        if (
          (
            currentField === undefined
            || (currentField !== field && visited[field])
          )
          &&
          this.validators[field] !== undefined
        ) {
          return {
            ...errors,
            [field]: this.validators[field](form[field]),
          };
        }
        return { ...errors, [field]: [] };
      },
      {},
    );
  }

  submit = () => {
    const { form, autoOn } = this.state;
    const { actions, clusterName } = this.props;
    const errors = this.validate(form);
    const visited = Object.keys(form).reduce(
      (visitedFields, field) => ({ ...visitedFields, [field]: true }),
      {},
    );

    this.setState({ errors, visited });

    if (!Object.values(errors).some(fieldErrors => fieldErrors.length > 0)) {
      actions.addNode({
        clusterName,
        nodeData: {
          name: form.nodename,
          port: form.pcsdport || "2224",
          autoOn,
        },
      });
    }
  }

  render() {
    const { form, errors, autoOn } = this.state;
    const { clusterNodeAdd } = this.props;
    return (
      <Form>
        <Form.Input
          type="text"
          label="Node name"
          name="nodename"
          value={form.nodename}
          onChange={this.nodeChanged}
          autoComplete="off"
          onBlur={() => this.setVisited("nodename")}
        />
        {
          errors.nodename.length > 0
          &&
          <Message negative>{errors.nodename}</Message>
        }
        <Form.Input
          type="text"
          label="Pcsd port"
          name="pcsdport"
          placeholder="2224"
          value={form.pcsdport}
          onChange={this.nodeChanged}
          onBlur={() => this.setVisited("pcsdport")}
        />
        {
          errors.pcsdport.length > 0
          &&
          <Message negative>{errors.pcsdport}</Message>

        }
        <Form.Field
          control={Checkbox}
          label="Automatically turn on (start + enable)"
          name="auto-on"
          checked={autoOn}
          onChange={e => this.setState({ autoOn: e.target.value })}
        />
        {
          clusterNodeAdd.authRequired
          && (
          <React.Fragment>
            <Message info>
              {
              "Enter password for user 'hacluster' to authenticate node "
              + `'${form.nodename}'`
            }
            </Message>
            <Form.Input
              type="password"
              label={`Password for node '${form.nodename}'`}
              name="password"
              value={form.password}
            />
          </React.Fragment>
          )}
        <Button
          name="add-node"
          onClick={this.submit}
          positive
          labelPosition="right"
          icon="checkmark"
          content="Add node"
        />
      </Form>
    );
  }
}

export default ClusterNodeAddForm;
