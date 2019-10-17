import React from 'react';
import { shallow } from 'enzyme';

import SignUp from "../../App/components/Sign_up";


describe("/", () => {

    it("should render the SignUp page", (done) => {
        const wrapper = shallow(<SignUp />);

        expect(wrapper.find("#sign-up").exists()).toBe(true);
        expect(wrapper.find(".back-button").exists()).toBe(true);
        expect(wrapper.find(".standard-form").exists()).toBe(true); 
        done(); 
    })  

})