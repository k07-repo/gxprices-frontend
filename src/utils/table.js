import React from 'react'

export const differenceSort = (a, b, order, dataField, rowA, rowB) => {
    let differenceA = rowA.product.currentMarketPrice - rowA.product.previousMarketPrice
    let differenceB = rowB.product.currentMarketPrice - rowB.product.previousMarketPrice

    if (order === 'asc') {
        return differenceB - differenceA
    }

    return differenceA - differenceB; // desc
}

export const differenceFormatter = (cell, row) => {
    let difference = (row.product.currentMarketPrice - row.product.previousMarketPrice).toFixed(2)
    let color = 'black'
    if (difference < 0) {
        color = 'red'
    }
    else if (difference > 0) {
        color = 'green'
        difference = '+' + difference
    }

    return (
        <font color={color}>
            {difference}
        </font>
    )
}

export const percentDifferenceSort = (a, b, order, dataField, rowA, rowB) => {
    let differenceA = (rowA.product.currentMarketPrice - rowA.product.previousMarketPrice) / rowA.product.previousMarketPrice
    let differenceB = (rowB.product.currentMarketPrice - rowB.product.previousMarketPrice) / rowB.product.previousMarketPrice

    if (order === 'asc') {
        return differenceB - differenceA
    }

    return differenceA - differenceB; // desc
}

export const percentDifferenceFormatter = (cell, row) => {
    let difference = (100 * (row.product.currentMarketPrice - row.product.previousMarketPrice) / row.product.previousMarketPrice).toFixed(2)
    let color = 'black'
    if (difference < 0) {
        color = 'red'
    }
    else if (difference > 0) {
        color = 'green'
        difference = '+' + difference
    }

    difference = difference + '%'

    return (
        <font color={color}>
            {difference}
        </font>
    )
}

export const priceFormatter = (cell, row) => {
    return row.product.currentMarketPrice ? row.product.currentMarketPrice.toFixed(2) : "No price"
}

/****************************************************/
//Spares to deal with the product-by-itself data in prices
//May be a better solution but this well work for now

export const differenceSort2 = (a, b, order, dataField, rowA, rowB) => {
    let differenceA = rowA.currentMarketPrice - rowA.previousMarketPrice
    let differenceB = rowB.currentMarketPrice - rowB.previousMarketPrice

    if (order === 'asc') {
        return differenceB - differenceA
    }

    return differenceA - differenceB; // desc
}

export const differenceFormatter2 = (cell, row) => {
    let difference = (row.currentMarketPrice - row.previousMarketPrice).toFixed(2)
    let color = 'black'
    if (difference < 0) {
        color = 'red'
    }
    else if (difference > 0) {
        color = 'green'
        difference = '+' + difference
    }

    return (
        <font color={color}>
            {difference}
        </font>
    )
}

export const percentDifferenceSort2 = (a, b, order, dataField, rowA, rowB) => {
    let differenceA = (rowA.currentMarketPrice - rowA.previousMarketPrice) / rowA.previousMarketPrice
    let differenceB = (rowB.currentMarketPrice - rowB.previousMarketPrice) / rowB.previousMarketPrice

    if (order === 'asc') {
        return differenceB - differenceA
    }

    return differenceA - differenceB; // desc
}

export const percentDifferenceFormatter2 = (cell, row) => {
    let difference = (100 * (row.currentMarketPrice - row.previousMarketPrice) / row.previousMarketPrice).toFixed(2)
    let color = 'black'
    if (difference < 0) {
        color = 'red'
    }
    else if (difference > 0) {
        color = 'green'
        difference = '+' + difference
    }

    difference = difference + '%'

    return (
        <font color={color}>
            {difference}
        </font>
    )
}

export const priceFormatter2 = (cell, row) => {
    return row.currentMarketPrice ? row.currentMarketPrice.toFixed(2) : "No price"
}

/******************************/

//CSV Formatting (no JSX)
export const differenceFormatterCSV = (cell, row) => {
    return (row.product.currentMarketPrice - row.product.previousMarketPrice).toFixed(2)
}

export const percentFormatterCSV = (cell, row) => {
    return (100 * (row.product.currentMarketPrice - row.product.previousMarketPrice)/(row.product.previousMarketPrice)).toFixed(2) + "%"
}

//Need separate ones to handle the watchlist data
export const differenceFormatterCSVWatchlist = (cell, row) => {
    return (row.currentMarketPrice - row.previousMarketPrice).toFixed(2)
}

export const percentFormatterCSVWatchlist = (cell, row) => {
    return (100 * (row.currentMarketPrice - row.previousMarketPrice)/(row.previousMarketPrice)).toFixed(2) + "%"
}

//All-purpose method that can compare string and integer numbers
//Used to ensure that '10' comes before '2' for example, which doesn't happen with lexicographical comaprison
//Also handles strings that simply contain numbers (e.g. 1/202)
export const compareNumbers = (a, b, order, dataField, rowA, rowB) => {
    
    let result = 0

    if(typeof a === 'string' && typeof b === 'string') {
        result = a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
    }
    else {
        if (a > b) {
            result = 1
        }
        else if(a < b) {
            result = -1
        }
        else {
            result = 0
        }
    }

    if(order === 'desc') {
        result = result * -1
    }
    return result
}

//Default sort for react bootstrap table (ascending by number)
export const defaultSort = [{
    dataField: 'cardNumber',
    order: 'asc'
}];