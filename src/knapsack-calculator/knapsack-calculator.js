import React, { Component } from 'react';

import './knapsack-calculator.css';


/**
 *  TODO:
 *  - functionality
 *      - look into O(W) space version of dp knapsack
 *      - show list of selected items
 *      - input for quantity (think about how to handle quantity, not trivial)
 *      - sort orders (price, alphabetical, input order)
 *      - click and drag/drop
 *      - reset button w/ confirmation?
 *      - calculate in sorted order - if not all items of a price are selected, show "pick x"
 *      - focus on new item when pressing enter
 *      - unpin all button
 *      - tax rate
 *      - user feedback (cant pin, not a number (price & target))
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
    REGEX_PRICE_RTL = /^((\d)*(\.)?(\d)*)$/

    constructor(props) {
        super(props)

        this.state = {
            inputs: [0, 1, 2, 3, 4],
            item_names: ["soda", "watermelon", "chips", "pomegranate", "pie"],
            item_prices: ["0.99", "5.99", "1.99", "2.99", "3.14"],
            item_selections: [false, false, false, false, false],
            num_pinned_items: 0,
            pinned_items: [false, false, false, false, false],
            pinned_total: 0,
            remainder: "10.00",
            saved_price: "",
            target: "10.00",
            total: "0.00",
        }

        this.calculate_solution = this.calculate_solution.bind(this)
        this.render_input = this.render_input.bind(this)
        this.append_input = this.append_input.bind(this)
        this.remove_input = this.remove_input.bind(this)
        this.handle_item_name_change = this.handle_item_name_change.bind(this)
        this.handle_item_price_change = this.handle_item_price_change.bind(this)
        this.handle_target_change = this.handle_target_change.bind(this)
        this.check_price = this.check_price.bind(this)
        this.check_target = this.check_target.bind(this)
        this.reset_item_selections = this.reset_item_selections.bind(this)
    }

    componentDidMount = () => {
        // resize target input
        const targetInput = document.getElementById("target-input")
        this.resizeInput(targetInput)
    }

    /* CORE ALGORITHMS */

    calculate_solution = () => {
        // reset selections
        this.reset_item_selections()

        // init vars for knapsack
        let item_prices = this.state.item_prices.map(price => {
            return this.toFixedNumber(parseFloat(price) * 100, 0)
        })
        let item_idxs = JSON.parse(JSON.stringify(this.state.inputs))
        let num_items = item_prices.length
        let target = this.toFixedNumber(parseFloat(this.state.target) * 100, 0)
        let updatedTarget = target

        // filter out pinned items
        const num_pinned_items = this.state.num_pinned_items
        if (num_pinned_items > 0) {
            // get unpinned item vars
            const pinned_items = this.state.pinned_items
            let unpinned_item_prices = []
            let unpinned_item_idxs = []
            for (let i = 0; i < pinned_items.length; i++) {
                if (!pinned_items[i]) {
                    unpinned_item_prices.push(item_prices[i])
                    unpinned_item_idxs.push(i)
                }
            }

            // use unpinned item vars
            item_prices = unpinned_item_prices
            item_idxs = unpinned_item_idxs
            num_items -= num_pinned_items
            const pinned_total = this.toFixedNumber(parseFloat(this.state.pinned_total) * 100, 0)
            updatedTarget = this.toFixedNumber(updatedTarget - pinned_total, 2)
        }

        // init table for dp
        let T = new Array(num_items+1)
        for (let i = 0; i <= num_items; i++) {
            T[i] = new Array(updatedTarget+1)
            T[i][0] = 0
        }
        for (let i = 0; i <= updatedTarget; i++) {
            T[0][i] = 0
        }

        // fill table using dp
        for (let i = 1; i <= num_items; i++) {
            for (let j = 1; j <= updatedTarget; j++) {
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
        const pinned_total = this.state.pinned_total
        const unpinned_total = this.toFixedNumber(T[num_items][updatedTarget] / 100., 2)
        let total = this.toFixedNumber(pinned_total + unpinned_total, 2)
        let remainder = this.toFixedNumber((target / 100.) - total, 2)

        // set total cost and remainder to strings
        total = total.toFixed(2)
        remainder = remainder.toFixed(2)

        // get selected items
        let item_selections = this.state.item_selections
        let selected_items_idxs = []
        let curr_item_idx = num_items
        let curr_target_idx = updatedTarget
        while (curr_item_idx > 0 && curr_target_idx > 0) {
            // curr item not used
            if (T[curr_item_idx][curr_target_idx] === T[curr_item_idx-1][curr_target_idx]) {
                curr_item_idx--
                continue
            }
            // curr item used
            console.log("idx used: " + curr_item_idx)
            selected_items_idxs.push(item_idxs[curr_item_idx-1])
            curr_target_idx -= item_prices[curr_item_idx-1]
            curr_item_idx--
        }
        selected_items_idxs.map(idx => {
            item_selections[idx] = true
        })

        // update state
        this.setState({
            item_selections: item_selections,
            remainder: remainder,
            total: total,
        })
    }

    /* LOGIC HELPERS */

    // get number with fixed decimal spaces
    toFixedNumber = (num, decimals) => {
        const pow = Math.pow(10, decimals)
        return Math.round(num * pow) / pow;
    }

    /* FORM VISUALS */

    // renders item inputs
    render_input = (index) => {
        // dynamic classname for indicating selections
        let input_group_id = "unselected"
        if (this.state.item_selections[index] === true) {
            input_group_id = "selected"
        }

        // dynamic classname for indicating pinned items
        let pin_icon_id = "unselected"
        if (this.state.pinned_items[index] === true) {
            pin_icon_id = "selected"
        }

        // render input group
        return (
            <div className={"input_group-"+input_group_id} key={index}>
                {/* PIN BUTTON */}
                <div className="input_group-section" id="pin">
                    <div
                        className={"pin_icon-"+pin_icon_id}
                        onClick={(e) => {this.toggle_pin_input(e, index)}}>
                    </div>
                </div>
                {/* ITEM NAME */}
                <div className="input_group-section" id="name">
                    <input
                        className={"input_group-input-name-"+input_group_id}
                        type="text"
                        placeholder="Enter Item"
                        value={this.state.item_names[index]}
                        onChange={(e) => this.handle_item_name_change(e, index)}
                        onKeyDown={(e) => this.handle_enter(e, index)}
                    />
                </div>
                {/* ITEM PRICE */}
                <div className="input_group-section" id="price">
                    <div className="input_group-label">$</div>
                    <input
                        className={"input_group-input-price-"+input_group_id}
                        type="text"
                        inputMode="numeric"
                        placeholder="0.00"
                        value={this.state.item_prices[index]}
                        onClick={(e) => this.handle_item_price_click(e, index)}
                        onChange={(e) => this.handle_item_price_change(e, index)}
                        onBlur={(e) => this.check_price(e, index)}
                    />
                </div>
                {/* CLOSE BUTTON */}
                <div className="input_group-section" id="close">
                    <div
                        className="remove_icon"
                        onClick={(e) => {this.remove_input(e, index)}}>
                    </div>
                </div>
            </div>
        )
    }

    // resize input based on input value length
    resizeInput = (input) => {
        input.style.width = input.value.length + "ch"
    }

    /* FORM LOGIC - ADDING & REMOVING ITEMS */

    // add item
    append_input = (index) => {
        // add item at index
        let inputs = this.state.inputs
        let item_names = this.state.item_names
        let item_prices = this.state.item_prices
        let item_selections = this.state.item_selections
        let pinned_items = this.state.pinned_items
        inputs = inputs.concat([this.state.inputs.length])
        if (index === -1) {
            item_names = item_names.concat("")
            item_prices = item_prices.concat("")
            item_selections = item_selections.concat(false)
            pinned_items = pinned_items.concat(false)
        } else {
            item_names.splice(index, 0, "")
            item_prices.splice(index, 0, "")
            item_selections.splice(index, 0, false)
            pinned_items.splice(index, 0, false)
        }

        // update state & reset selections
        this.setState({
            inputs: inputs,
            item_names: item_names,
            item_prices: item_prices,
            item_selections: item_selections,
            pinned_items: pinned_items,
        }, function() {
            this.reset_item_selections()
        })
    }

    // remove item
    remove_input = (e, index) => {
        // stop auto refresh
        e.preventDefault()

        // grab item vars
        const updated_inputs = this.state.inputs
        const updated_item_names = this.state.item_names
        const updated_item_prices = this.state.item_prices
        const updated_item_selections = this.state.item_selections
        const updated_pinned_items = this.state.pinned_items

        // check if pinned item
        if (updated_pinned_items[index]) {
            this.toggle_pin_input(e, index)
        }

        // remove item
        updated_inputs.pop()
        updated_item_names.splice(index, 1)
        updated_item_prices.splice(index, 1)
        updated_item_selections.splice(index, 1)
        updated_pinned_items.splice(index, 1)

        // update state & reset selections
        this.setState({
            inputs: updated_inputs,
            item_names: updated_item_names,
            item_prices: updated_item_prices,
            item_selections: updated_item_selections,
            pinned_items: updated_pinned_items,
        }, function() {
            this.reset_item_selections()
        })
    }

    // new item on enter
    handle_enter = (e, index) => {
        if (e.key === "Enter") {
            this.append_input(index+1)
            this.reset_item_selections()
        }
    }

    /* FORM LOGIC - UPDATING VALUES */

    // target click handler
    handle_target_click = (e) => {
        // save original price
        const saved_price = e.target.value

        // update placeholder with original price
        document.getElementById("target-input").setAttribute("placeholder", saved_price)

        // clear price
        let target = this.state.target
        target = ""
        this.setState({
            saved_price: saved_price,
            target: target,
        }, function() {
            this.reset_item_selections()
        })
    }

    // target change handler
    handle_target_change = (e) => {
        let input = e.target.value
        if (this.REGEX_PRICE.test(input)) {
            // make sure target is below max budget
            const price = this.toFixedNumber(parseFloat(input), 2)
            if (isNaN(price) || price <= this.MAX_TARGET) {
                // update state & reset selections
                this.setState({
                    target: input,
                }, function() {
                    this.reset_item_selections()
                })
            }
        }
    }

    // pin & unpin item for selection
    toggle_pin_input = (e, index) => {
        // grab pinned vars
        let pinned_items = this.state.pinned_items
        let pinned_total = this.state.pinned_total
        const item_prices = this.state.item_prices
        let pinned_item_price = this.toFixedNumber(parseFloat(item_prices[index]), 2)
        // pinned item price is being changed - use saved price
        if (item_prices[index] === "") {
            const saved_price = this.state.saved_price
            pinned_item_price = this.toFixedNumber(parseFloat(saved_price), 2)
        }
        let num_pinned_items = this.state.num_pinned_items

        // pin
        if (!pinned_items[index]) {
            // check if pinning item goes over target
            const target = this.toFixedNumber(parseFloat(this.state.target), 2)
            if (pinned_total + pinned_item_price <= target) {
                // pin item and update pinned vars
                pinned_items[index] = true
                pinned_total = this.toFixedNumber(pinned_total + pinned_item_price, 2)
                num_pinned_items += 1
            }
        }
        // unpin
        else {
            // unpin item and update pinned vars
            pinned_items[index] = false
            pinned_total = this.toFixedNumber(pinned_total - pinned_item_price, 2)
            num_pinned_items -= 1
        }

        // update state & reset selections
        this.setState({
            num_pinned_items: num_pinned_items,
            pinned_items: pinned_items,
            pinned_total: pinned_total,
        }, function() {
            this.reset_item_selections()
        })
    }

    // item names change handler
    handle_item_name_change = (e, index) => {
        let item_names = this.state.item_names
        item_names[index] = e.target.value
        this.setState({
            item_names: item_names,
        }, function() {
            this.reset_item_selections()
        })
    }

    // item prices click handler
    handle_item_price_click = (e, index) => {
        // save original price
        const saved_price = e.target.value

        // update placeholder with original price
        // if new item, saved price will be empty, so update placeholder
        let placeholder = saved_price
        if (placeholder === "") {
            placeholder = "0.00"
        }
        // find number of pinned items prior to current item (affects index)
        const pinned_items = this.state.pinned_items
        let num_pinned_prior = 0
        for (let i = 0; i < index; i++) {
            if (pinned_items[i]) {
                num_pinned_prior++
            }
        }
        // current item pinned
        if (pinned_items[index]) {
            document.getElementsByClassName("input_group-input-price-selected")[num_pinned_prior]
                .setAttribute("placeholder", placeholder)
        }
        // current item not pinned
        else {
            document.getElementsByClassName("input_group-input-price-unselected")[index-num_pinned_prior]
                .setAttribute("placeholder", placeholder)
        }

        // clear price
        let item_prices = this.state.item_prices
        item_prices[index] = ""
        this.setState({
            item_prices: item_prices,
            saved_price: saved_price,
        }, function() {
            this.reset_item_selections()
        })
    }

    // item prices change handler
    handle_item_price_change = (e, index) => {
        // unpin item if pinned
        const updated_pinned_items = this.state.pinned_items
        if (updated_pinned_items[index]) {
            this.toggle_pin_input(e, index)
        }

        let input = e.target.value
        if (this.REGEX_PRICE.test(input)) {
            let item_prices = this.state.item_prices
            item_prices[index] = input
            this.setState({
                item_prices: item_prices,
            }, function() {
                this.reset_item_selections()
            })
        }
    }

    /* FORM VISUALS - PRICE STRING FORMATTING */

    // standardizes price string format
    format_price_string = (input) => {
        // check decimals
        input = this.format_decimals_string(input)

        // trim leading zeros
        input = input.replace(/^0+/, '')
        if (input.slice(0, 1) === ".") {
            input = "0" + input
        }

        return input
    }

    // standardizes decimals in price string
    format_decimals_string = (input) => {
        // no decimals
        if (!input.includes('.')) {
            return input + ".00"
        }
        // incomplete decimals
        if (this.REGEX_DECIMALS.test(input)) {
            // ends with decimal
            if (input.slice(-1) === '.') {
                return input + "00"
            }
            // ends with decimal and one digit
            else {
                return input + "0"
            }
        }
        return input
    }

    // price formatting on blur
    check_price = (e, index) => {
        // check for saved original price & reset saved price
        let input = e.target.value
        let saved_price = this.state.saved_price
        if (input === "" && saved_price !== "") {
            input = saved_price
        }
        saved_price = ""

        // format input
        input = this.format_price_string(input)

        // update item price
        let item_prices = this.state.item_prices
        item_prices[index] = input

        // update state & reset selections
        this.setState({
            item_prices: item_prices,
            saved_price: saved_price,
        }, function() {
            this.reset_item_selections()
        })
    }

    // target formatting on blur
    check_target = (e) => {
        // check for saved original price & reset saved price
        let input = e.target.value
        let saved_price = this.state.saved_price
        if (input === "" && saved_price !== "") {
            input = saved_price
        }
        saved_price = ""

        // format input
        input = this.format_price_string(input)

        // update state
        this.setState({
            target: input,
        }, function() {
            // resize target input
            const targetInput = document.getElementById("target-input")
            this.resizeInput(targetInput)

            // reset selections
            this.reset_item_selections()
        })
    }

    reset_item_selections = () => {
        // reset all item selections to pinned - deep copy
        let item_selections = JSON.parse(JSON.stringify(this.state.pinned_items))

        // reset total and remainder, accounting for pinned items
        const pinned_total = this.state.pinned_total
        const total = this.format_price_string("" + pinned_total)
        const remainder = this.toFixedNumber(this.state.target - pinned_total, 2)
        const remainderStr = this.format_price_string("" + remainder)

        // update state
        this.setState({
            item_selections: item_selections,
            remainder: remainderStr,
            total: total
        })
    }

    render() {
        return (
            <div className="KnapsackCalculator">
                {/* HEADERS */}
                <div className="header_top">
                    <div className="header1">
                        <div className="header1-label">Budget</div>
                        <div className="header1-input">
                            <div className="header1-input-label">$</div>
                            <input
                                className="input_group-input"
                                id="target-input"
                                type="text"
                                value={this.state.target}
                                onClick={(e) => this.handle_target_click(e)}
                                onChange={(e) => this.handle_target_change(e)}
                                onBlur={(e) => this.check_target(e)}
                            />
                        </div>
                    </div>
                    <div className="header2">
                        <div className="header2-section">
                            <div className="header2-label">Total</div>
                            <div className="header2-value">{"$"+this.state.total}</div>
                        </div>
                        <div className="header2-section">
                            <div className="header2-label">Remaining</div>
                            <div className="header2-value">{"$"+this.state.remainder}</div>
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
                    <div className="button" id="add-item" onClick={() => this.append_input(-1)}>
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
