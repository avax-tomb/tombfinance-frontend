import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 173px;
  height: 40px;
  background-color: #1C8242;
  border-radius: 32px;
  filter: drop-shadow(14px 8px 27px rgba(28, 130, 66, 0.3));
  color: white;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`

interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <ButtonWrap onClick={handleWalletProviderOpen}>
          {buttonText}
        </ButtonWrap>
      ) : (
        <ButtonWrap onClick={onPresentAccountModal}>
          Connect
        </ButtonWrap>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
