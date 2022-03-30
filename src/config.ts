// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'Fantom Opera Testnet',
    ftmscanUrl: 'https://testnet.ftmscan.com',
    defaultProvider: 'https://rpc.testnet.fantom.network/',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1Ed8AD466beddF92ef448A132661956621', 18],
      USDC: ['0x2B8d519e274f0e189d5c59dF09d3ab9Af214A4B4', 6],
      // BOO: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      // ZOO: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      // SHIBA: ['0x39523112753956d19A3d6a30E758bd9FF7a8F3C0', 9],
      'USDT-FTM-LP': ['0x89056Cb420ba5b7a71f6492692Bc439cf952D232', 18],
      'TOMB-FTM-LP': ['0x86cB8845889Cdfe8ba5396051e383Be4218BBe42', 18],
      'TSHARE-FTM-LP': ['0xd9A1AcD7a15A85EF49758FF1931081BbD77714Cc', 18],
    },
    baseLaunchDate: new Date(1648202306 * 1000),
    bondLaunchesAt: new Date((1648202306 + 86400 * 2) * 1000),
    masonryLaunchesAt: new Date((1648202306 + 86400 * 2) * 1000),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpcapi.fantom.network/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      USDC: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
      // BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      // ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      // SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'TOMB-FTM-LP': ['0x2A651563C9d3Af67aE0388a5c8F89b867038089e', 18],
      'TSHARE-FTM-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  TombFtmRewardPool: {
    name: 'Earn TOMB by FTM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'GenesisPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  TombUsdcRewardPool: {
    name: 'Earn TOMB by USDC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'GenesisPool',
    depositTokenName: 'USDC',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 2,
    closedForStaking: true,
  },
  // TombBooRewardPool: {
  //   name: 'Earn TOMB by BOO',
  //   poolId: 1,
  //   sectionInUI: 0,
  //   contract: 'TombBooGenesisRewardPool',
  //   depositTokenName: 'BOO',
  //   earnTokenName: 'TOMB',
  //   finished: false,
  //   sort: 2,
  //   closedForStaking: true,
  // },
  // TombShibaRewardPool: {
  //   name: 'Earn TOMB by SHIBA',
  //   poolId: 2,
  //   sectionInUI: 0,
  //   contract: 'TombShibaGenesisRewardPool',
  //   depositTokenName: 'SHIBA',
  //   earnTokenName: 'TOMB',
  //   finished: false,
  //   sort: 3,
  //   closedForStaking: true,
  // },
  // TombZooRewardPool: {
  //   name: 'Earn TOMB by ZOO',
  //   poolId: 3,
  //   sectionInUI: 0,
  //   contract: 'TombZooGenesisRewardPool',
  //   depositTokenName: 'ZOO',
  //   earnTokenName: 'TOMB',
  //   finished: false,
  //   sort: 4,
  //   closedForStaking: true,
  // },
  TombFtmLPTombRewardPool: {
    name: 'Earn TOMB by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'TombRewardPool',
    depositTokenName: 'TOMB-FTM-LP',
    earnTokenName: 'TOMB',
    finished: false,
    sort: 3,
    closedForStaking: true,
  },
  TombFtmLPTShareRewardPool: {
    name: 'Earn TSHARE by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'TShareRewardPool',
    depositTokenName: 'TOMB-FTM-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  TshareFtmLPTShareRewardPool: {
    name: 'Earn TSHARE by TSHARE-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TShareRewardPool',
    depositTokenName: 'TSHARE-FTM-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
