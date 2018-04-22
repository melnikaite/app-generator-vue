import contract from 'truffle-contract'
import EntitynameContract from '@contracts/EntitynameContract.json'
import getTransactionReceiptMined from './getTransactionReceiptMined'

const Entityname = {

  contract: null,

  instance: null,

  init: function ($web3) {
    this.$web3 = $web3;
    this.$web3.eth.getTransactionReceiptMined = getTransactionReceiptMined;
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(EntitynameContract)
      self.contract.setProvider(self.$web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  countEntityname: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.countEntityname.call(
        {from: self.$web3.eth.accounts[0]}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  entitynameArray: function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      const gas = Math.floor(Math.random() * 50000) + 30000;
      self.instance.entitynameArray.call(
        index,
        {from: self.$web3.eth.accounts[0], gas: gas}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  entitynameMap: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      const gas = Math.floor(Math.random() * 50000) + 30000;
      self.instance.entitynameMap.call(
        id,
        {from: self.$web3.eth.accounts[0], gas: gas}
      ).then(result => {
        const entityname = {
          id: self.$web3.toUtf8(id),
          index: result[0],
          owner: result[1],
          updated: result[2],
          initialized: result[3],
_valueResultCommaSeparated_
        };
        resolve(entityname)
      }).catch(err => {
        reject(err)
      })
    })
  },

  createEntityname: function (id, _valueCommaSeparated_) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.createEntityname(
        id,
        _valueCommaSeparated_,
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

  updateEntityname: function (id, _valueCommaSeparated_) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.updateEntityname(
        id,
        _valueCommaSeparated_,
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

  deleteEntityname: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.deleteEntityname(
        id,
        {from: self.$web3.eth.accounts[0], gas: 200000}
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

export default Entityname
