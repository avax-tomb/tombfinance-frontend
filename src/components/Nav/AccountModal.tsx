import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useTombFinance from '../../hooks/useTombFinance';
import TokenSymbol from '../TokenSymbol';
import { TOMB_TICKER, TSHARE_TICKER, TBOND_TICKER } from '../../utils/constants'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const tombFinance = useTombFinance();

  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const displayTombBalance = useMemo(() => getDisplayBalance(tombBalance), [tombBalance]);

  const tshareBalance = useTokenBalance(tombFinance.TSHARE);
  const displayTshareBalance = useMemo(() => getDisplayBalance(tshareBalance), [tshareBalance]);

  const tbondBalance = useTokenBalance(tombFinance.TBOND);
  const displayTbondBalance = useMemo(() => getDisplayBalance(tbondBalance), [tbondBalance]);

  return (
    <Modal>
      <StyledTitle>
        <ModalTitle text="MY WALLET" />
      </StyledTitle>
      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol={TOMB_TICKER} />
          <StyledBalance>
            <StyledValue>{displayTombBalance}</StyledValue>
            <Label text={`${TOMB_TICKER} Available`} color="#FFFFFF" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol={TSHARE_TICKER} />
          <StyledBalance>
            <StyledValue>{displayTshareBalance}</StyledValue>
            <Label text={`${TSHARE_TICKER} Available`} color="#FFFFFF" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol={TBOND_TICKER} />
          <StyledBalance>
            <StyledValue>{displayTbondBalance}</StyledValue>
            <Label text={`${TBOND_TICKER} Available`} color="#FFFFFF" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledTitle = styled.div`
  margin-top: 45px;

  > div {
    font-size: 60px;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledValue = styled.div`
  color: white;
  font-size: 35px;
  font-weight: 600;
  line-height: 37px;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

const Balances = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  max-width: 300px;
  background-color: #1C8242;
  border-radius: 44px;
  padding: 10px;
  filter: drop-shadow(14px 8px 27px rgba(28, 130, 66, 0.3));

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default AccountModal;
