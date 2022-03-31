import React from 'react';
import styled from 'styled-components';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/tokens/TOMB.png';
import tShareLogo from '../../assets/img/tokens/TSHARE.png';
import tBondLogo from '../../assets/img/tokens/TBOND.png';

import ftmLogo from '../../assets/img/tokens/FTM.png';
import wftmLogo from '../../assets/img/tokens/wFTM.png';
import usdcLogo from '../../assets/img/tokens/USDC.png';

import { TOMB_TICKER, TSHARE_TICKER, TBOND_TICKER } from '../../utils/constants';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  [`${TOMB_TICKER}`]: tombLogo,
  [`${TSHARE_TICKER}`]: tShareLogo,
  [`${TBOND_TICKER}`]: tBondLogo,
  FTM: ftmLogo,
  WFTM: wftmLogo,
  USDC: usdcLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  const splits = symbol.split('-').filter((token) => token !== 'LP');
  if (!splits.every((token) => logosBySymbol[token])) {
    console.log(splits, logosBySymbol);
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  const Wrapper = splits.length > 1 ? SymbolLP : Symbol;
  return (
    <Wrapper style={{ width: size, height: size }}>
      {splits.map((token) => (
        <img key={token} src={logosBySymbol[token]} alt={`${token} Logo`} />
      ))}
    </Wrapper>
  );
};

export default TokenSymbol;

const Symbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const SymbolLP = styled(Symbol)`
  img {
    width: 70%;
    height: 70%;
    position: relative;
    background: white;
    &:nth-child(1) {
      z-index: 1;
      left: 15%;
      margin-bottom: -15%;
    }
    &:nth-child(2) {
      right: 15%;
      margin-top: -15%;
    }
  }
`;
