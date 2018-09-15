import React from 'react';
import {Form, Checkbox, Button, Message} from 'semantic-ui-react'
import isPort from 'validator/lib/isPort';
import isEmpty from 'validator/lib/isEmpty';


class ClusterNodeAddForm extends React.Component{
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
    }
  }

  validators = {
    nodename: (value) => {
      const errors = [];
      if(isEmpty(value)){
        errors.push("Node name cannot be empty")
      }
      return errors;
    },
    pcsdport: (value) => {
      const errors = [];
      if( ! isEmpty(value) && ! isPort(value)){
        errors.push(`${value} is not valid port`)
      }
      return errors;
    }
  }

  nodeChanged = (event, {name, value}) => {
    let keepPassword = false
    if(this.props.clusterNodeAdd.authRequired){
      this.props.actions.stopReuireAuthDataChanged()
      keepPassword = true
    }

    const form = {
      ...this.state.form,
      [name]: value,
      password: keepPassword ? this.state.form.password : "",
    }

    const errors = this.validate(form, name);

    this.setState({form: form, errors: errors})
  }

  setVisited = (name) => {
    this.setState({visited: {...this.state.visited, [name]: true}})
  }

  validate = (form, currentField=undefined) => {
    const errors = {}

    for(let field in form){
      if(
        (
          currentField === undefined
          ||
          (currentField !== field && this.state.visited[field])
        )
        &&
        this.validators[field] !== undefined
      ){
        errors[field] = this.validators[field](form[field]);
      }else{
        errors[field] = [];
      }
    }

    return errors;
  }

  submit = () => {
    const errors = this.validate(this.state.form);
    const visited = {}
    for(let field in this.state.form){
      visited[field] = true;
    }

    this.setState({
      errors: errors,
      visited: visited,
    });

    if(this.emptyErrors(errors)){
      this.props.actions.addNode({
        clusterName: this.props.clusterName,
        nodeData: {
          name: this.state.form.nodename,
          port: this.state.form.pcsdport || "2224",
          autoOn: this.state.autoOn,
        }
      })
    }
  }

  emptyErrors = errors => {
    for(let field in errors){
      if(errors[field].length > 0){
        return false;
      }
    }
    return true;
  }


  render(){
    return (
      <Form>
        <Form.Input type="text"
          label="Node name"
          name="nodename"
          value={this.state.form.nodename}
          onChange={this.nodeChanged}
          autoComplete="off"
          onBlur={() => this.setVisited("nodename")}
        />
        {
          this.state.errors.nodename.length > 0
          &&
          <Message negative>{this.state.errors.nodename}</Message>
        }
        <Form.Input type="text"
          label="Pcsd port"
          name="pcsdport"
          placeholder="2224"
          value={this.state.form.pcsdport}
          onChange={this.nodeChanged}
          onBlur={() => this.setVisited("pcsdport")}
        />
        {
          this.state.errors.pcsdport.length > 0
          &&
          <Message negative>{this.state.errors.pcsdport}</Message>

        }
        <Form.Field control={Checkbox}
          label="Automatically turn on (start + enable)"
          name="auto-on"
          checked={this.state.autoOn}
          onChange={e => this.setState({autoOn: e.target.value})}
        />
        {
          this.props.clusterNodeAdd.authRequired
          &&
          <React.Fragment>
            <Message info>
            {
              "Enter password for user 'hacluster' to authenticate node "
              +`'${this.state.form.nodename}'` 
            }
            </Message>
            <Form.Input type="password"
              label={`Password for node '${this.state.form.nodename}'`}
              name="password"
              value={this.state.form.password}
              // onChange={e => this.setState({form.password: e.target.value})}
            />
          </React.Fragment>
        }
        <Button
          name="add-node"
          onClick={this.submit}
          positive
          labelPosition='right'
          icon='checkmark'
          content="Add node"
        />
      </Form>
    )
  }
}

export default ClusterNodeAddForm;
