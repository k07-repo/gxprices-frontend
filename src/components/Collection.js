import React, { useState, useEffect } from 'react'
import listService from '../services/listService'
import userService from '../services/userService'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import { LOCAL_STORAGE_ID } from '../utils/constants'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import ProductModal from './ProductModal'
import * as TableUtils from '../utils/table'
import * as DateUtils from '../utils/date'

const Collection = () => {
    const [user, setUser] = useState(null)
    const [ownedProducts, setOwnedProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [show, setShow] = useState(false)

    const nameFormatter = (cell, row) => {
        return (
            <button onClick={() => openProductModal(row.product)}>{row.product.name}</button>
        )
    }

    const openProductModal = (product) => {
        setSelectedProduct(product)
        setShow(true)
    }

    const deleteProduct = async (productId) => {
        await listService.deleteFromCollection(user.id, productId)
        window.location.reload()
    }

    const increment = async (productId) => {
        const updatedData = await listService.increment(user.id, productId)
        setOwnedProducts(updatedData.ownedProducts)
    }

    const decrement = async (productId) => {
        const updatedData = await listService.decrement(user.id, productId)
        setOwnedProducts(updatedData.ownedProducts)
    }

    const buttonFormatter = (cell, row) => {
        return (
            <div>
                <button onClick={() => increment(row.product._id)}>
                    <BiPlus />
                </button>
                <button onClick={() => decrement(row.product._id)}>
                    <BiMinus />
                </button>
                <button onClick={() => deleteProduct(row.product._id)}>
                    <MdDeleteForever />
                </button>
            </div>
        )
    }

    const columns = [{
        dataField: 'product.name',
        text: 'Name',
        sort: true,
        formatter: nameFormatter
    }, {
        dataField: 'product.group.groupName',
        text: 'Set',
        sort: true
    }, {
        dataField: 'product.cardNumber',
        text: 'Number',
        sort: true,
        sortFunc: TableUtils.compareNumbers
    }, {
        dataField: 'product.cardRarity',
        text: 'Rarity',
        sort: true
    }, {
        dataField: 'product.currentMarketPrice',
        text: 'Unit Price',
        sort: true,
        formatter: TableUtils.priceFormatter
    }, {
        dataField: 'difference',
        text: 'Change',
        isDummyField: true,
        sort: true,
        sortFunc: TableUtils.differenceSort,
        formatter: TableUtils.differenceFormatter,
        csvFormatter: TableUtils.differenceFormatterCSV
    }, {
        dataField: 'percentDifference',
        text: 'Change (%)',
        isDummyField: true,
        sort: true,
        sortFunc: TableUtils.percentDifferenceSort,
        formatter: TableUtils.percentDifferenceFormatter,
        csvFormatter: TableUtils.percentFormatterCSV
    }, {
        dataField: 'quantity',
        text: 'Quantity',
        sort: true,
    }, {
        dataField: 'button',
        isDummyField: true,
        formatter: buttonFormatter,
        csvExport: false
    }]

    const getOwnedProducts = (userId) => {
        userService
            .getUser(userId)
            .then(response => {
                setOwnedProducts(response.data.ownedProducts)
            })
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            listService.setToken(user.token)
            userService.setToken(user.token)
            getOwnedProducts(user.id)
        }
    }, [])

    const ExportCSVButton = (props) => {
        const handleClick = () => {
            props.onExport()
        }

        return (
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        )
    }


    const collectionTable = () => {
     
        const filename = 'collection_' + DateUtils.currentDateFilename() + '.csv'
        return (
            <div>
                <ProductModal product={selectedProduct} show={show} handleClose={() => setShow(false)} />
                <ToolkitProvider bootstrap4={true} keyField="id" data={ ownedProducts } columns={ columns } exportCSV={{fileName: filename}}>
                    {
                      props => (
                       <div>                         
                         <BootstrapTable { ...props.baseProps } />
                         <ExportCSVButton { ...props.csvProps }>Export to CSV</ExportCSVButton>
                         <hr/>
                      </div>
                     )
                    }
                </ToolkitProvider>
            </div>
        )
    }

    return (
        <div align="center">
            <h1>Collection</h1>
            {user ? collectionTable() :
                <div>
                    Log in or register to view or create your collection!
            </div>}
        </div>
    )
}

export default Collection