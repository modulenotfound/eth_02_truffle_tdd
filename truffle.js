const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const infuraUrl = process.env.INFURAURL;

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infuraUrl);
      },
      network_id: 3
    }
  }
};
