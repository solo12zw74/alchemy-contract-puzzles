const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const [account1] = await ethers.getSigners();


    return { game, account1 };
  }
  it('should be a winner', async function () {
    const { game, account1 } = await loadFixture(deployContractAndSetVariables);

    await game.connect(account1).write(account1.address);
    await game.win(account1.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
