import React from 'react';
import { shallow } from 'enzyme';

import EditItem from "../../App/components/Edit_item";


describe("/", () => {

    it("should render the EditItem page", (done) => {
        const wrapper = shallow(<EditItem />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />"); 
        done(); 
    })  

})