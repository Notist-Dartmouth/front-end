import React from 'react';
import CreateGroupDialog from '../components/CreateGroupDialog';

class GroupDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      validName: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, newValue) {
    if (e.target.id === 'name') {
      this.setState({ name: newValue });
      if (this.state.name.length > 0) {
        this.setState({ validName: true });
      }
    } else if (e.target.id === 'description') {
      this.setState({ description: newValue });
    }
  }

  handleSubmit() {
    if (this.state.name.length === 0) {
      this.setState({ validName: false });
    }
  }

  render() {
    return (
      <CreateGroupDialog
        validName={this.state.validName}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default GroupDialog;
