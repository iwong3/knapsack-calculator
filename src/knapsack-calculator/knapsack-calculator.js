import React, { Component } from 'react';

import './knapsack-calculator.css';


/**
 *  TODO:
 *  - functionality
 *      - show list of selected items
 *      - input for target
 *      - input for quantity (think about how to handle quantity, not trivial)
 *      - price input restrictions (numbers only)
 *      - reset button w/ confirmation?
 *  - styling
 *      - highlight selected items differently
 *      - button placement
 *      - remove item button -> symbol
 *      - width of inputs (price doesn't need to be big)
 *      - mobile specific design
 *  - design
 *      - think about separate components
 *      - think about moving functions to utility files
 */
export default class KnapsackCalculator extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputs: [0, 1, 2],
            item_names: ["soda", "watermelon", "gum"],
            item_prices: [1.99, 5.99, 0.99],
            item_selections: [false, false, false],
            target: 10,
            total: 0,
        }

        this.calculate_solution = this.calculate_solution.bind(this)
        this.handle_item_name_change = this.handle_item_name_change.bind(this)
        this.handle_item_price_change = this.handle_item_price_change.bind(this)
    }

    calculate_solution = () => {
        // reset selections
        this.reset_item_selections()

        // init vars for knapsack
        const item_prices = this.state.item_prices.map(price => {
            return parseFloat(price, 10) * 100
        })
        let item_selections = this.state.item_selections
        const num_items = item_prices.length
        const target = this.state.target * 100

        // init table for dp
        let T = new Array(num_items+1)
        for (let i = 0; i <= num_items; i++) {
            T[i] = new Array(target+1)
            T[i][0] = 0
        }
        for (let i = 0; i <= target; i++) {
            T[0][i] = 0
        }

        // fill table using dp
        for (let i = 1; i <= num_items; i++) {
            for (let j = 1; j <= target; j++) {
                const current_item_price = item_prices[i-1]
                const target_without = T[i-1][j]
                if (current_item_price <= j) {
                    const target_with = T[i-1][j-current_item_price]+current_item_price
                    T[i][j] = Math.max(target_with, target_without);
                } else {
                    T[i][j] = target_without
                }
            }
        }

        // get total cost of selected items
        const total = T[num_items][target] / 100.

        // get selected items
        let selected_items_idxs = []
        let curr_item_idx = num_items
        let curr_target_idx = target
        while (curr_item_idx > 0 && curr_target_idx > 0) {
            // curr item not used
            if (T[curr_item_idx][curr_target_idx] === T[curr_item_idx-1][curr_target_idx]) {
                curr_item_idx--
                continue
            }
            // curr item used
            selected_items_idxs.push(curr_item_idx-1)
            curr_target_idx -= item_prices[curr_item_idx-1]
            curr_item_idx--
        }
        selected_items_idxs.map(idx => {
            item_selections[idx] = true
        })

        // update state
        this.setState({
            item_selections: item_selections,
            total: total
        })
    }

    /** FORM HANDLERS */

    handle_item_name_change = (e, index) => {
        // update item name
        let item_names = this.state.item_names
        item_names[index] = e.target.value
        this.setState({
            item_names: item_names
        })

        // reset selections
        this.reset_item_selections()
    }

    handle_item_price_change = (e, index) => {
        // update item price
        let item_prices = this.state.item_prices
        item_prices[index] = e.target.value
        this.setState({
            item_prices: item_prices
        })

        // reset selections
        this.reset_item_selections()
    }

    render_input = (index) => {
        // dynamic classname for indicating selections
        let input_group_classname = "input_group"
        if (this.state.item_selections[index] === true) {
            input_group_classname = "input_group-selected"
        }

        // render input group
        return (
            <div className={input_group_classname}>
                <div className="input_group-section">
                    <div className="input_group-label">Item: </div>
                    <input
                        type="text"
                        value={this.state.item_names[index]}
                        onChange={(e) => {this.handle_item_name_change(e, index)}}
                    />
                </div>
                <div className="input_group-section">
                    <div className="input_group-label">Price: </div>
                    <input
                        type="text"
                        value={this.state.item_prices[index]}
                        onChange={(e) => {this.handle_item_price_change(e, index)}}
                    />
                </div>
                <button onClick={(e) => {this.remove_input(e, index)}}>
                    Remove Item
                </button>
            </div>
        )
    }

    append_input = () => {
        // add input group
        this.setState(prevState => ({
            inputs: prevState.inputs.concat([this.state.inputs.length]),
            item_names: prevState.item_names.concat([""]),
            item_prices: prevState.item_prices.concat([0])
        }))

        // reset selections
        this.reset_item_selections()
    }

    remove_input = (e, index) => {
        // stop auto refresh
        e.preventDefault()

        // remove item & update state
        const updated_inputs = this.state.inputs
        updated_inputs.pop()
        const updated_item_names = this.state.item_names
        updated_item_names.splice(index, 1)
        const updated_item_prices = this.state.item_prices
        updated_item_prices.splice(index, 1)
        this.setState({
            inputs: updated_inputs,
            item_names: updated_item_names,
            item_prices: updated_item_prices
        })

        // reset selections
        this.reset_item_selections()
    }

    reset_item_selections = () => {
        // reset all item selections to false
        const num_items = this.state.item_prices.length
        let item_selections = []
        for (let i = 0; i < num_items; i++) {
            item_selections.push(false)
        }
        this.setState({
            item_selections: item_selections
        })
    }

    render() {
        return (
            <div className="KnapsackCalculator">
                <div>Target: </div>
                <div>{this.state.target}</div>
                <div>Total: </div>
                <div>{this.state.total}</div>
                <form>
                    {this.state.inputs.map(index => {
                        return this.render_input(index)
                    })}
                </form>
                <button onClick={() => this.append_input()}>
                    Add Item
                </button>
                <button onClick={() => this.calculate_solution()}>
                    Calculate
                </button>
            </div>
        )
    }

}
