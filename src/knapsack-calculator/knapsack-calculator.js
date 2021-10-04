import React, { Component } from 'react';

import './knapsack-calculator.css';


/**
 *  TODO:
 *  - functionality
 *      - show list of selected items
 *      - input for quantity (think about how to handle quantity, not trivial)
 *      - reset button w/ confirmation?
 *      - click to include item
 *      - pin item
 *      - calculate in sorted order - if not all items of a price are selected, show "pick x"
 *      - press enter to enter new item
 *  - bugs
 *  - styling
 *      - top always visible
 *      - add / calculate always visible
 *      - close icon has fixed width - spacing is weird because its wrapped by div
 *  - design
 *      - think about separate components
 *      - think about moving functions to utility files
 */
export default class KnapsackCalculator extends Component {

    // price vars
    MAX_TARGET = 9999.99

    // price regex
    REGEX_DECIMALS = /(\.\d{0,1})$/
    REGEX_PRICE = /^((\d)*(\.\d{0,2})?)$/
    REGEX_TARGET = /^\$((\d)*(\.\d{0,2})?)$/

    constructor(props) {
        super(props)

        this.state = {
            inputs: [0, 1, 2],
            item_names: ["soda", "watermelon", "gum"],
            item_prices: [1.99, 5.99, 0.99],
            item_selections: [false, false, false],
            remainder: "$10.00",
            target: "$10.00",
            total: "$0.00",
        }

        this.calculate_solution = this.calculate_solution.bind(this)
        this.render_input = this.render_input.bind(this)
        this.append_input = this.append_input.bind(this)
        this.remove_input = this.remove_input.bind(this)
        this.handle_item_name_change = this.handle_item_name_change.bind(this)
        this.handle_item_price_change = this.handle_item_price_change.bind(this)
        this.handle_target_change = this.handle_target_change.bind(this)
        this.reset_item_selections = this.reset_item_selections.bind(this)
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
        const target = (parseFloat(this.state.target.substring(1)) * 100).toFixed(0)

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

        // get total cost and remainder of selected items
        const total = (T[num_items][target] / 100.).toFixed(2)
        const remainder = ((target / 100.) - total).toFixed(2)

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
            remainder: "$" + remainder,
            total: "$" + total
        })
    }

    /** FORM VISUALS */

    // renders item inputs
    render_input = (index) => {
        // dynamic classname for indicating selections
        let input_group_id = "unselected"
        if (this.state.item_selections[index] === true) {
            input_group_id = "selected"
        }

        // render input group
        return (
            <div className="input_group" id={input_group_id}>
                <div className="input_group-section" id="name">
                    <input
                        className="input_group-input"
                        id={input_group_id}
                        type="text"
                        placeholder="Enter Item"
                        value={this.state.item_names[index]}
                        onChange={(e) => this.handle_item_name_change(e, index)}
                    />
                </div>
                <div className="input_group-section" id="price">
                    <div className="input_group-label">$</div>
                    <input
                        className="input_group-input"
                        id={input_group_id}
                        type="text"
                        value={this.state.item_prices[index]}
                        onChange={(e) => this.handle_item_price_change(e, index)}
                        onBlur={(e) => this.check_price(e, index)}
                    />
                </div>
                <div className="input_group-section" id="close">
                    <div
                        className="remove_icon"
                        onClick={(e) => {this.remove_input(e, index)}}>
                    </div>
                </div>
            </div>
        )
    }

    /** FORM LOGIC - ADDING & REMOVING ITEMS */

    // add item
    append_input = () => {
        this.setState(prevState => ({
            inputs: prevState.inputs.concat([this.state.inputs.length]),
            item_names: prevState.item_names.concat([""]),
            item_prices: prevState.item_prices.concat([(0.00).toFixed(2)])
        }), function() {
            this.reset_item_selections()
        })
    }

    // remove item
    remove_input = (e, index) => {
        // stop auto refresh
        e.preventDefault()

        // remove item
        const updated_inputs = this.state.inputs
        const updated_item_names = this.state.item_names
        const updated_item_prices = this.state.item_prices
        updated_inputs.pop()
        updated_item_names.splice(index, 1)
        updated_item_prices.splice(index, 1)

        // update state & reset selections
        this.setState({
            inputs: updated_inputs,
            item_names: updated_item_names,
            item_prices: updated_item_prices
        }, function() {
            this.reset_item_selections()
        })
    }

    /** FORM LOGIC - UPDATING VALUES */

    // item names handler
    handle_item_name_change = (e, index) => {
        let item_names = this.state.item_names
        item_names[index] = e.target.value
        this.setState({
            item_names: item_names
        }, function() {
            this.reset_item_selections()
        })
    }

    // item prices handler
    handle_item_price_change = (e, index) => {
        let input = e.target.value
        if (this.REGEX_PRICE.test(input)) {
            let item_prices = this.state.item_prices
            item_prices[index] = input
            this.setState({
                item_prices: item_prices
            }, function() {
                this.reset_item_selections()
            })
        }
    }

    // target handler
    handle_target_change = (e) => {
        let input = e.target.value
        // target should always include '$'
        if (input.length === 0) {
            input = "$"
        }
        if (this.REGEX_TARGET.test(input)) {
            // make sure target is below max budget
            const price = parseFloat(input.substring(1))
            if (isNaN(price) || price <= this.MAX_TARGET) {
                this.setState({
                    target: input
                }, function() {
                    this.reset_item_selections()
                })
            }
        }
    }

    // standardizes price format
    format_price = (input) => {
        // check decimals
        input = this.format_decimals(input)

        // trim leading zeros
        input = input.replace(/^0+/, '')
        if (input.slice(0, 1) === ".") {
            input = "0" + input
        }

        return input
    }

    // standardizes decimals
    format_decimals = (input) => {
        // ends with partial decimals
        if (this.REGEX_DECIMALS.test(input)) {
            if (input.slice(-1) === '.') {
                input += "00"
            } else {
                input += "0"
            }
        }
        // no decimals
        else if (!input.includes('.')) {
            input += ".00"
        }

        return input
    }

    // price formatting on blur
    check_price = (e, index) => {
        // format input
        let input = e.target.value
        input = this.format_price(input)

        // update item price
        let item_prices = this.state.item_prices
        item_prices[index] = input

        // update state & reset selections
        this.setState({
            item_prices: item_prices
        }, function() {
            this.reset_item_selections()
        })
    }

    // target formatting on blur
    check_target = (e) => {
        // format input
        let input = e.target.value
        input = "$" + this.format_price(input.substring(1))

        // update state & reset selections
        this.setState({
            target: input
        }, function() {
            this.reset_item_selections()
        })
    }

    reset_item_selections = () => {
        // reset all item selections to false
        const num_items = this.state.item_prices.length
        let item_selections = []
        for (let i = 0; i < num_items; i++) {
            item_selections.push(false)
        }

        // update state
        this.setState({
            item_selections: item_selections,
            remainder: this.state.target,
            total: "$0.00"
        })
    }

    render() {
        return (
            <div className="KnapsackCalculator">
                {/* HEADERS */}
                <div className="header_top">
                    <div className="header1">
                        <div className="header1-label">Budget</div>
                        <input
                            className="input_group-input"
                            id="target-input"
                            type="text"
                            value={this.state.target}
                            onChange={(e) => this.handle_target_change(e)}
                            onBlur={(e) => this.check_target(e)}
                        />
                    </div>
                    <div className="header2">
                        <div className="header2-section">
                            <div className="header2-label">Total</div>
                            <div className="header2-value">{this.state.total}</div>
                        </div>
                        <div className="header2-section">
                            <div className="header2-label">Remaining</div>
                            <div className="header2-value">{this.state.remainder}</div>
                        </div>
                    </div>
                </div>
                {/* ITEM INPUTS */}
                <form>
                    {this.state.inputs.map(index => {
                        return this.render_input(index)
                    })}
                </form>
                {/* BUTTONS */}
                <div className="button_group">
                    <div className="button" id="add-item" onClick={() => this.append_input()}>
                        Add Item
                    </div>
                    <div className="button" id="calculate" onClick={() => this.calculate_solution()}>
                        Calculate
                    </div>
                </div>
            </div>
        )
    }

}
