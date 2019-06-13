import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const friendOptions = [
  {
    key: 'Bryan Nilsen',
    text: 'Bryan Nilsen',
    value: '1',
    image: { avatar: true, src: 'https://avatars2.githubusercontent.com/u/43187473?s=60&v=4' },
  },
  {
    key: 'Brenda Long',
    text: 'Brenda Long',
    value: '2',
    image: { avatar: true, src: 'https://avatars2.githubusercontent.com/u/4067527?s=60&v=4' },
  },
];

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder="Select Friend"
    fluid
    selection
    options={friendOptions}
  />
);

export default DropdownExampleSelection;