const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { SignerWithAddress } = require('@nomiclabs/hardhat-ethers/signers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const provider = ethers.provider;
    // the secret key reverted from randomly generated address in the internet resource https://www.ethereumaddressgenerator.com/
    const wallet = new ethers.Wallet("c3818511b7743f8a557789c2e03fadb159a140e421ed2f1f1c5cc93bf70cdbef", provider);
    const signer = ethers.provider.getSigner(0);
    signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther('1.0')
    })

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
