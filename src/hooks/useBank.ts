import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank, ContractName } from '../tomb-finance';

const useBank = (sectionUI: string, contractName: ContractName): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => bank.depositTokenName === contractName && bank.sectionInUI == Number(sectionUI));
};

export default useBank;
