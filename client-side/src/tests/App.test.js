import React from 'react';
import { shallow } from 'enzyme';
import App from "../App";

describe('Render app to test for crashing', () => {
   it('renders without crashing', () => {
      const wrapper = shallow(<App />);

      expect(wrapper.find(".App").exists()).toBe(true); 
    });
});