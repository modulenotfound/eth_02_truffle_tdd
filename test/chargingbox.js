const Chargingbox = artifacts.require("./Chargingbox.sol");

contract('Chargingbox 1', (accounts) => {
  it("should have the first account as owner", async () => {
    const chargingbox = await Chargingbox.deployed();
    const owner = await chargingbox.owner();
    assert.equal(owner, accounts[0], "the owner of the charging box is not the first account");
  });

  it("should rent the charging box for 2 minutes and emit event", async () => {
    const chargingbox = await Chargingbox.deployed();
    const tx = await chargingbox.rent({from: accounts[1], value: web3.toWei(0.002, "ether")});
    const renter = await chargingbox.renter();
    assert.equal(renter, accounts[1], "the renter of the charging box is not the second account");
    assert.equal(tx.logs[0].event, 'Rented', "the event Rented is not emitted");
  });
});

contract('Chargingbox 2', (accounts) => {
  it("should not be able to rented again before the rent time expires", async () => {
    const chargingbox = await Chargingbox.deployed();
    await chargingbox.rent({from: accounts[1], value: web3.toWei(0.002, "ether")});

    try {
      await chargingbox.rent({from: accounts[2], value: web3.toWei(0.005, "ether")});
      assert.fail('Something is wrong! The charging box can be rented again.');
    } catch (err) {
      assert.include(err.toString(), 'revert', "error message doesn't contain revert!");
    }
  })
});

contract('Chargingbox 3', (accounts) => {
  it("should be available again after the rent time expires", (done) => {
    let chargingbox;
    Chargingbox.deployed()
      .then((instance) => {
        chargingbox = instance;
      }).then(() => {
      return chargingbox.rent({from: accounts[1], value: web3.toWei(0.001, "ether")});
    }).then(() => {
      setTimeout(() => {
        chargingbox.rent({from: accounts[2], value: web3.toWei(0.001, "ether")})
          .then(() => {
            done();
          }).catch((err) => {
          assert.fail("The charging box can not be rented again after the rent time expires");
        })
      }, 65000);
    })
  })
});

contract('Chargingbox 4', (accounts) => {
  it("should not be rented if the ether transferred is insufficient", async () => {
    const chargingbox = await Chargingbox.deployed();
    try {
      await chargingbox.rent({from: accounts[1], value: web3.toWei(0.0005, "ether")});
      assert.fail('Something is wrong!');
    } catch (err) {
      assert.include(err.toString(), 'revert', "error message doesn't contain revert!");
    }
  })
})
