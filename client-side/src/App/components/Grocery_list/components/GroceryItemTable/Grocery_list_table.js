import React from "react";
import {NavLink} from "react-router-dom";

// Grocery item table to display items
function GroceryListTable(props) {
    return (
        <div id="item-table-container">
            <table id="item-table">
                <tr>
                    <th>Purchased</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Edit Item</th>
                    <th>Delete Item</th>
                </tr>

                {props.items.map(item => {
                    return (
                        <tr>
                            <td>
                                <input
                                    onClick={(e) => props.updatePurchased(!item.purchased, item.name)}
                                    type="checkbox" name={item.name}
                                    checked={item.purchased}></input>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.location}</td>
                            <td>
                                <NavLink to={`/grocery-item/edit/${props.groceryListName}/${item.name}`}>
                                    <p className="item-edit">Edit</p>
                                </NavLink>
                            </td>
                            <td onClick={(e) => props.deleteItem(e, item.name)}><p className="item-delete">Delete</p></td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default GroceryListTable;