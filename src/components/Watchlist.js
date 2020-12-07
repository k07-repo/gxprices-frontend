import React, {useState, useEffect} from 'react'
import listService from '../services/listService'
import userService from '../services/userService'
import {LOCAL_STORAGE_ID} from '../utils/constants'
import { MdDeleteForever } from 'react-icons/md'
import ProductModal from './ProductModal'
import * as TableUtils from '../utils/table'
import * as DateUtils from '../utils/date'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const Watchlist = () => {
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [show, setShow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const nameFormatter = (cell, row) => {
        return (
            <button onClick={() => openProductModal(row)}>{row.name}</button>
        )
    }

    const openProductModal = (product) => {
        setSelectedProduct(product)
        setShow(true)
    }

    const getWatchlist = (userId) => {
        userService
            .getUser(userId)
            .then(response => {
                setWatchlist(response.data.watchlist)
            })
      }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)            
            listService.setToken(user.token)
            userService.setToken(user.token)
            getWatchlist(user.id)
        }
    }, [])  

    const deleteProduct = async (productId) => {
        await listService.deleteFromWatchlist(user.id, productId)
        window.location.reload()
    }

    const buttonFormatter = (cell, row) => {
        return (
            <div>               
                <button onClick={() => deleteProduct(row._id)}>
                    <MdDeleteForever />
                </button>
            </div>
        )
    }

    const columns = [{
        dataField: 'name',
        text: 'Name',
        sort: true,
        formatter: nameFormatter
    }, {
        dataField: 'group.groupName',
        text: 'Set',
        sort: true
    }, {
        dataField: 'cardNumber',
        text: 'Number',
        sort: true,
        sortFunc: TableUtils.compareNumbers
    }, {
        dataField: 'cardRarity',
        text: 'Rarity',
        sort: true
    }, {
        dataField: 'currentMarketPrice',
        text: 'Unit Price',
        sort: true,
        formatter: TableUtils.priceFormatter2
    }, {
        dataField: 'difference',
        text: 'Change',
        isDummyField: true,
        sort: true,
        sortFunc: TableUtils.differenceSort2,
        formatter: TableUtils.differenceFormatter2,
        csvFormatter: TableUtils.differenceFormatterCSVWatchlist
    }, {
        dataField: 'percentDifference',
        text: 'Change (%)',
        isDummyField: true,
        sort: true,
        sortFunc: TableUtils.percentDifferenceSort2,
        formatter: TableUtils.percentDifferenceFormatter2,
        csvFormatter: TableUtils.percentFormatterCSVWatchlist
    }, {
        dataField: 'button',
        isDummyField: true,
        formatter: buttonFormatter,
        csvExport: false
    }]

    const ExportCSVButton = (props) => {
        const handleClick = () => {
            props.onExport()
        }

        return (
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        )
    }

    const watchlistTable = () => {
        const filename = 'watchlist_' + DateUtils.currentDateFilename() + '.csv'

        return (
            <div>
                <ProductModal product={selectedProduct} show={show} handleClose={() => setShow(false)} />
                <ToolkitProvider bootstrap4={true} keyField="id" data={ watchlist } columns={ columns } exportCSV={{fileName: filename}}>
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
            <h1>Watchlist</h1>
            {user ? watchlistTable() :
                <div>
                    Log in or register first to view or create your watchlist!
               </div>
               }
        </div>
    )
}

export default Watchlist