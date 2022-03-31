import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useTombFinance from '../../hooks/useTombFinance';
import { Bank } from '../../tomb-finance';
import config, { bankDefinitions } from '../../config';
import { TOMB_TICKER } from '../../utils/constants'

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];
    const now = Date.now();

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!tombFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await tombFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          tombFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      let closedForStaking: boolean = true;
      switch (bankInfo.contract) {
        case 'GenesisPool':
        case 'TombRewardPool':
          if (now < config.bondLaunchesAt.getTime()) {
            closedForStaking = false;
          }
          break;
        default:
          if (now >= config.bondLaunchesAt.getTime()) {
            closedForStaking = false;
          }
          break;
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: tombFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === TOMB_TICKER ? tombFinance.TOMB : tombFinance.TSHARE,
        closedForStaking,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [tombFinance, setBanks]);

  useEffect(() => {
    if (tombFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, tombFinance, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
