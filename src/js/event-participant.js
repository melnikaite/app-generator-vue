import contract from 'truffle-contract'
import EventParticipantContract from '@contracts/EventParticipant.json'

const EventParticipant = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(EventParticipantContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  readEventByIndex: function (index) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.readEventByIndex.call(
        index,
        {from: window.web3.eth.accounts[0]}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  countEvent: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.countEvent.call(
        {from: window.web3.eth.accounts[0]}
      ).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },

  createEvent: function (id, name) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.createEvent(
        id,
        name,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  updateEvent: function (id, name) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.createEvent(
        id,
        name,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  deleteEvent: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.deleteEvent(
        id,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default EventParticipant
