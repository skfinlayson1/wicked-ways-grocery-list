import React from 'react';
import { shallow } from 'enzyme';

import Navbar from "../../app/components/Navbar";

describe("Navbar test", () => {

    it("should render the component and check its values", (done) => {
        const wrapper = shallow(<Navbar />);

        expect(wrapper.find("#navigation").exists()).toBe(true);
        expect(wrapper.find("#navigation").text()).toContain("<NavLink />")
 
        done()
    })

})