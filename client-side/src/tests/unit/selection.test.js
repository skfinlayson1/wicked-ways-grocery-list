import React from 'react';
import { shallow } from 'enzyme';

import Selection from "../../App/components/Selection";


describe("/", () => {

    it("should render the Selection page", (done) => {
        const wrapper = shallow(<Selection />);

        expect(wrapper.find("#home").exists()).toBe(true);
        expect(wrapper.find(".sign-in-section").exists()).toBe(true);
        expect(wrapper.find(".sign-up-section").exists()).toBe(true); 
        done(); 
    })  

})