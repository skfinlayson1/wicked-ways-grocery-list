import React from 'react';
import { shallow } from 'enzyme';

import EditList from "../../App/components/Edit_list";


describe("/", () => {

    it("should render the EditList page", (done) => {
        const wrapper = shallow(<EditList />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />"); 
        done(); 
    })  

})