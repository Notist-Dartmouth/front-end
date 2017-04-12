import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

export default class ChipExampleArray extends Component {

  constructor(props) {
    super(props);
    this.state = { chipData: [
      { key: 0, label: 'politics' },
      { key: 1, label: '@cblanc' },
      { key: 2, label: 'X' },
      { key: 3, label: 'Y' },
    ] };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  handleRequestDelete = (key) => {
    if (key === 3) {
      console.log('Are you sure you want to delete _?');
      return;
    }

    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map(chip => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({ chipData: this.chipData });
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    );
  }
}
