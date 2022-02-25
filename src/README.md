# Knapsack Calculator

Author: Ivan Wong

### Summary

This knapsack calculator is a mobile website that optimizes items by price to get you closest to your budget.
It comes with functionality such as...
- requiring certain items to be used
- sorting items

It was created as a solution to use up as much of Pathpoint's monthly stipends as possible. However, soon after creating this, I realized many merchants allow you to cap the amount spent on a card, which effectively negates the usefulness of this app. There still are some use cases, such as when the aforementioned functionality isn't available, online shopping such as Amazon, and when using cash.

### TODO

functionality
 - look into O(W) space version of dp knapsack
 - show list of selected items
 - input for quantity (think about how to handle quantity, not trivial)
 - sort orders (price, alphabetical, input order)
 - click and drag/drop
 - reset button w/ confirmation?
 - calculate in sorted order - if not all items of a price are selected, show "pick x"
 - focus on new item when pressing enter
 - unpin all button
 - tax rate
 - user feedback (cant pin, not a number (price & target))
bugs
styling
 - top always visible
 - add / calculate always visible
 - close icon has fixed width - spacing is weird because its wrapped by div
 - $ spacing is weird on mobile
 - fix pin all button - bad design
design
 - think about separate components
 - think about moving functions to utility files
