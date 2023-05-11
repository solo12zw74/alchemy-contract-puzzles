const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const [account1, account2, account3] = await ethers.getSigners();

    return { game, account1, account2, account3 };
  }

  it('should be a winner', async function () {
    const { game, account1, account2, account3 } = await loadFixture(deployContractAndSetVariables);

    await game.connect(account3).buy({ value: '1' });
    await game.connect(account2).buy({ value: '3' });
    await game.connect(account1).buy({ value: '2' });

    await game.win(account1.address, account2.address, account3.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
