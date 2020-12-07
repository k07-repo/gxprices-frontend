import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import * as DateUtils from '../utils/date'
import * as TableUtils from '../utils/table'
import tcgplayerlogo from './assets/tcgplayerlogo.png'

const ProductModal = ({ show, product, handleClose }) => {

  if (!product) {
    return null
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Card Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div align="center">
            <table className="product">
              <tbody>
                <tr>
                  <td rowSpan="3">
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                  </td>
                  <td valign="top">
                    <div className="product-name">
                      {product.name}
                    </div>
                    <div className="product-info">
                      {product.group ? product.group.groupName : 'Set Name Not Found'}
                    </div>
                    <div className="product-info">
                      {product.cardNumber}
                    </div>
                    <div className="product-info">
                      {product.cardRarity}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <div className="product-info">
                      Market Price: {product.currentMarketPrice}
                    </div>
                    <div className="product-info">
                      Change: {TableUtils.differenceFormatter2(null, product)} ({TableUtils.percentDifferenceFormatter2(null, product)})
                  </div>
                    <div className="product-info">
                      Last Updated: {product.currentDate ? DateUtils.formatDate(new Date(product.currentDate)) : "Unknown"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    <img width="36px" height="18px" alt="" src={tcgplayerlogo}/>&nbsp;
                    <a href={product.storeUrl}>Check TCGplayer prices</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductModal  