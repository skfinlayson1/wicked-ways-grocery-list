import React from 'react';
import { shallow } from 'enzyme';

import Landing from "../../App/components/Landing";


describe("/", () => {

    it("should render the Landing page", (done) => {
        const wrapper = shallow(<Landing />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />"); 
        done(); 
    })  

})