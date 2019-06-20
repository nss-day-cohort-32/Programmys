import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class DropdownExampleSelection extends Component {
  render() {
    const { voters } = this.props;
    const options = voters.map((voter) => {
      const option = {};
      option.key = voter.id;
      option.text = voter.displayName;
      option.value = voter.displayName;
      option.image = { avatar: true, src: voter.photoUrl };
      return option;
    });

    return (
      <Dropdown
        placeholder="Select Recipient"
        fluid
        selection
        options={options}
      />
    );
  }
}

export default DropdownExampleSelection;
