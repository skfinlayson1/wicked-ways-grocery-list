import React from 'react';
import { shallow } from 'enzyme';

import GroceryList from "../../App/components/Grocery_list";


describe("/", () => {

    it("should render the GroceryList page", (done) => {
        const wrapper = shallow(<GroceryList />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />"); 
        done(); 
    })  

})