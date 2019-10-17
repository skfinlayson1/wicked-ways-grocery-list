import React from 'react';
import { shallow } from 'enzyme';

import SignIn from "../../App/components/Sign_in";


describe("/", () => {

    it("should render the SignIn page", (done) => {
        const wrapper = shallow(<SignIn />);

        expect(wrapper.find("#sign-in").exists()).toBe(true);
        expect(wrapper.find(".back-button").exists()).toBe(true);
        expect(wrapper.find(".standard-form").exists()).toBe(true); 
        done(); 
    })  

})