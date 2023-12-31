import chai, {expect} from 'chai'
import {Contract, BigNumber, constants} from 'ethers'
import {solidity, MockProvider, deployContract} from 'ethereum-waffle'

import SafeMathTest from '../build/SafeMathTest.json'

chai.use(solidity)

const overrides = {
  gasLimit: 9999999,
}

describe('SafeMathTest', () => {
  const provider = new MockProvider({
    ganacheOptions: {
      hardfork: 'istanbul',
      mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
      gasLimit: 9999999,
    },
  })
  const [wallet] = provider.getWallets()

  let math: Contract
  before('deploy MathTest', async () => {
    math = await deployContract(wallet, SafeMathTest, [], overrides)
  })

 describe('#sqrt', () => {
    it('works for 0-99', async function() {
      this.timeout(15000); // Aumenta o tempo limite para 15 segundos (padrão é 2000ms)
      for (let i = 0; i < 100; i++) {
        expect(await math.sqrt(i)).to.eq(Math.floor(Math.sqrt(i)))
      }
    })
})


    it('max uint256', async () => {
      const expected = BigNumber.from(2).pow(128).sub(1)
      expect(await math.sqrt(constants.MaxUint256)).to.eq(expected)
    })
  })

