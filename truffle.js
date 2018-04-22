module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*',
    },
    kovan: {
      host: 'localhost',
      port: 8545,
      network_id: '42',
      from: '',
    },
  }
};
