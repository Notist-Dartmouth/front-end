import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export default class GroupDropDownMenu extends React.Component {

/* eslint-disable */

  constructor(props) {
    super(props);
    this.state = { value: this.props.initialSelection };
  }

  handleChange = (event, index, value) => this.setState({ value });


  render() {

    const items = this.props.values;
    for (let i = 0; i < items.length; i += 1) {
      items.push(<MenuItem value={i} key={i} primaryText={`Group ${items[i]}`} />);
    }

    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange} >
        {items}
      </DropDownMenu>
    );
  }
}
