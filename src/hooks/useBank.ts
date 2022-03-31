import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank } from '../tomb-finance';

const useBank = (sectionInUI: Number, poolId: Number): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => bank.sectionInUI == sectionInUI && bank.poolId === poolId);
};

export default useBank;
