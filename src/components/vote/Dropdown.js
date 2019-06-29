import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownSelection extends Component {
  constructor(props) {
    super(props);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleDropdown(_evt, data) {
    const { setDropdownData } = this.props;
    setDropdownData(data);
  }

  render() {
    const { voters } = this.props;
    const options = voters.map((voter) => {
      const option = {};
      option.key = voter.id;
      option.text = voter.displayName;
      option.value = voter.id;
      option.image = { avatar: true, src: voter.photoUrl };
      return option;
    });

    return (
      <Dropdown
        onChange={this.handleDropdown}
        placeholder="Select Recipient"
        fluid
        selection
        options={options}
      />
    );
  }
}

export default DropdownSelection;
