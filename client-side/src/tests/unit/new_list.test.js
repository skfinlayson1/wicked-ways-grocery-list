import React from 'react';
import { shallow } from 'enzyme';

import NewList from "../../App/components/New_list";


describe("/", () => {

    it("should render the NewList page", (done) => {
        const params = {match: {params: "newList"}}
        const wrapper = shallow(<NewList url={params} />);

        expect(wrapper.debug()).toContain("<InfoMessages messages={false} />");
        done();  
    })  

})