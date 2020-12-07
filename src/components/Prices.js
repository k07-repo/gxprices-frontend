import React, { useState, useEffect } from 'react'
import priceService from '../services/priceService'
import groupService from '../services/groupService'
import listService from '../services/listService'
import metaService from '../services/metaService'
import ProductModal from './ProductModal'
import * as TableUtils from '../utils/table'
import BootstrapTable from 'react-bootstrap-table-next'
import { AiFillEye } from 'react-icons/ai'
import { GiChest } from 'react-icons/gi'
import { LOCAL_STORAGE_ID } from '../utils/constants'
import * as DateUtils from '../utils/date'

const compare = (a, b) => {
  if (a.groupName < b.groupName) {
    return -1;
  }
  if (a.groupName > b.groupName) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

const Prices = () => {
  const [prices, setPrices] = useState([])
  const [groups, setGroups] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = useState(2594)
  const [user, setUser] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null) 
  const [show, setShow] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_ID)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      listService.setToken(user.token)
    }
  }, [])

  const nameFormatter = (cell, row) => {
    return (
        <button onClick={() => openProductModal(row)}>{row.name}</button>
    )
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setShow(true)
  }

  const getAllGroups = () => {
    groupService
      .getAll()
      .then(response => {
        setGroups(response.data.sort(compare))
      })
  }

  const getAllPricesFromSet = async (setId) => {
    //eslint-disable-next-line
    if (setId == 0) {
      const priceResponse = await priceService.getAll()
      setPrices(priceResponse.data)
    }
    else {
      const priceResponse = await priceService.getAllFromSet(setId)
      setPrices(priceResponse.data)
    }
  }

  const searchForPrices = async (event) => {
    event.preventDefault()
    if (searchTerm.length < 3) {
      return
    }
    else {
      const priceResponse = await priceService.searchPrices(searchTerm)
      setPrices(priceResponse.data)
    }
  }

  useEffect(() => {
    getAllPricesFromSet(2594)
    getAllGroups()
    metaService.getLastUpdated().then(response => {
      const lastUpdated = new Date(response.data.lastUpdated)
      setLastUpdated(DateUtils.formatDate(lastUpdated))
    })
  }, [])

  const changeGroup = (groupId) => {
    getAllPricesFromSet(groupId)
    setValue(groupId)
  }
  
  
  return (
    <div align="center">
      <h1>Current Market Prices</h1>
      <div>
        Last updated: {lastUpdated}
      </div>
      <div>
        <select id="set-selector" name="sets" value={value} onChange={(event) => changeGroup(event.target.value)}>
          <option value={0} key={0}>
            All cards (slow!)
          </option>
          {groups.map(group =>
            <option value={group.groupId} key={group.groupId}>
              {group.groupName}
            </option>
          )}
        </select>
      </div>
      <div>
        <form onSubmit={searchForPrices}>
          <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          <button type="submit">Search All Cards</button>
        </form>
      </div>
      <ProductModal product={selectedProduct} show={show} handleClose={() => setShow(false)} />
      <PriceTable nameFormatter={nameFormatter} user={user} prices={prices}/>
    </div>
  )
}

const PriceTable = (props) => {

  const addToCollection = async (productId) => {
    await listService.pushToCollection(props.user.id, productId)
  }

  const addToWatchlist = async (productId) => {
    await listService.pushToWatchlist(props.user.id, productId)
  }

  const buttonFormatter = (cell, row) => {
    return (
      <div>
        <button onClick={() => addToWatchlist(row._id)}>
          <AiFillEye />
        </button>
        <button onClick={() => addToCollection(row._id)}>
          <GiChest />
        </button>
      </div>
    )
  }

  const columns = [{
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: props.nameFormatter
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
    formatter: TableUtils.differenceFormatter2
  }, {
    dataField: 'percentDifference',
    text: 'Change (%)',
    isDummyField: true,
    sort: true,
    sortFunc: TableUtils.percentDifferenceSort2,
    formatter: TableUtils.percentDifferenceFormatter2
  }, {
    dataField: 'button',
    isDummyField: true,
    hidden: !(props.user),
    formatter: buttonFormatter
  }]

  function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.prices != this.prices || nextProps.user != this.user
  }

  return (
    props.prices ? <BootstrapTable bootstrap4={true} keyField='_id' data={props.prices} columns={columns} defaultSorted={TableUtils.defaultSort} /> : null
  )
}
export default Prices