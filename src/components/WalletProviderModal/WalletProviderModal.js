import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { Modal, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/wallet/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet/wallet-connect.svg';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';

const ListWrap = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .MuiListItem-button {
    max-width: 450px;
    background-color: #1C8242;
    border-radius: 44px;
    padding: 10px;
    filter: drop-shadow(14px 8px 27px rgba(28, 130, 66, 0.3));

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    .MuiListItemIcon-root {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-color: white;
      margin-right: 17px;

      img {
        width: 100%;
      }
    }
    .MuiListItemText-root span {
      font-size: 35px;
      font-weight: 600;
      color: white !important;
    }
  }
`

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100%',
    maxWidth: 548,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    filter: 'drop-shadow(10px 40px 50px rgba(28, 130, 66, 0.1))',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: '46px 90px',
    outline: 'none',
    '&> h2': {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#1C8242',
      textAlign: 'center',
      marginBottom: 20
    }
  },
}));

const WalletProviderModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2>CONNECT WALLET</h2>
        <ListWrap component="nav" aria-label="main mailbox folders">
          <WalletCard
            icon={<img src={metamaskLogo} alt="Metamask logo" style={{ height: 32 }} />}
            onConnect={() => {
              connect('injected');
            }}
            title="Metamask"
          />
          <WalletCard
            icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{ height: 24 }} />}
            onConnect={() => {
              connect('walletconnect');
            }}
            title="WalletConnect"
          />
        </ListWrap>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
