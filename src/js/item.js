import contract from 'truffle-contract'
import ItemContract from '@contracts/ItemContract.json'
import getTransactionReceiptMined from './getTransactionReceiptMined'

const Item = {

  contract: null,

  instance: null,

  init: function ($web3) {
    this.$web3 = $web3;
    this.$web3.eth.getTransactionReceiptMined = getTransactionReceiptMined;
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(ItemContract)
      self.contract.setProvider(self.$web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  countItem: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.countItem.call(
        {from: self.$web3.eth.accounts[0]}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  itemArray: function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      const gas = Math.floor(Math.random() * 50000) + 30000;
      self.instance.itemArray.call(
        index,
        {from: self.$web3.eth.accounts[0], gas: gas}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  itemMap: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      const gas = Math.floor(Math.random() * 50000) + 30000;
      self.instance.itemMap.call(
        id,
        {from: self.$web3.eth.accounts[0], gas: gas}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  createItem: function (id, name, location) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.createItem(
        id,
        name,
        location,
        {from: self.$web3.eth.accounts[0]}
      ).then((result) => {
        return self.$web3.eth.getTransactionReceiptMined(result.tx);
      }).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  updateItem: function (id, name, location) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.createItem(
        id,
        name,
        location,
        {from: self.$web3.eth.accounts[0]}
      ).then((result) => {
        return self.$web3.eth.getTransactionReceiptMined(result.tx);
      }).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  deleteItem: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.deleteItem(
        id,
        {from: self.$web3.eth.accounts[0], gas: 100000}
      ).then((result) => {
        return self.$web3.eth.getTransactionReceiptMined(result.tx);
      }).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Item
