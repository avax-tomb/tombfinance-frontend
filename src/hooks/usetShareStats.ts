import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import config from '../config';
import { TSHARE_TICKER } from '../utils/constants'

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const tombFinance = useTombFinance();

  const fetchSharePrice = useCallback(async () => {
    setStat(await tombFinance.getShareStat());
  }, [tombFinance]);

  useEffect(() => {
    fetchSharePrice().catch((err) => console.error(`Failed to fetch ${TSHARE_TICKER} price: ${err.stack}`));
    const refreshInterval = setInterval(fetchSharePrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, tombFinance, fetchSharePrice]);

  return stat;
};

export default useShareStats;
