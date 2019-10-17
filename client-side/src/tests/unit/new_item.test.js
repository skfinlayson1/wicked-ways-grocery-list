import React from 'react';
import { shallow } from 'enzyme';

import NewItem from "../../App/components/New_item";


describe("/", () => {

    it("should render the NewItem page", (done) => {
        const params = {match: {params: "newItem"}}
        const wrapper = shallow(<NewItem url={params} />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />"); 
        done(); 
    })  

})