import React, { useMemo } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/background.jpg';
import CashImage from '../../assets/img/logo.png';
import Image from 'material-ui-image';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Tomb as tombTesting, TShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { Tomb as tombProd, TShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/wallet/metamask-fox.svg';
import Logo from '../../assets/img/logo.png';

import { Box, Button, Card, CardContent, Grid } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';
import { TOMB_TICKER, TSHARE_TICKER, TBOND_TICKER } from '../../utils/constants';

const InstructionWrap = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(13px);
  border-radius: 36px;
  padding: 75px 24px;

  .left-side {
    flex: 1.5;
    max-width: 694px;

    h2:first-child {
      font-size: 78px;
      font-weight: bold;
      color: white;
    }
    h2:nth-child(2) {
      font-size: 78px;
      font-weight: bold;

      span:nth-child(1) {
        color: #1c8242;
      }
      span:nth-child(2) {
        color: #209fd2;
      }
    }

    p {
      font-size: 26px;
      color: white;
    }
  }
  .right-side {
    flex: 1;
    margin-left: 40px;
    img {
      width: 100%;
      max-width: 569px;
    }
  }
`;

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats(`${TOMB_TICKER}-FTM-LP`);
  const tShareFtmLpStats = useLpStats(`${TSHARE_TICKER}-FTM-LP`);
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(2) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(2) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(2) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: `${TOMB_TICKER}-FTM-LP` });
  const tshareLpZap = useZap({ depositTokenName: `${TSHARE_TICKER}-FTM-LP` });

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={`${TOMB_TICKER}-FTM-LP`}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={`${TSHARE_TICKER}-FTM-LP`}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={12}>
          <InstructionWrap>
            <Box className="left-side">
              <h2>Welcome to</h2>
              <h2>
                <span>Ranch</span> <span>Finance</span>
              </h2>
              <p>The first algorithmic stablecoin on Fantom Opera, pegged to the price of 1 FTM via seigniorage.</p>
              <p>
                Stake your {TSHARE_TICKER} in the Masonry to earn inflationary {TOMB_TICKER} rewards or provide
                liquidity on pairs and start earning today!
              </p>
            </Box>
            <Box className="right-side">
              <img src={Logo} alt="logo" />
            </Box>
          </InstructionWrap>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card style={{ borderRadius: 20 }}>
            <CardContent align="center">
              <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>Total Value Locked</h2>
              <CountUp style={{ fontSize: '32px', fontWeight: 700, color: '#209FD2' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 20 }}>
            <CardContent
              align="center"
              style={{ marginTop: '2.5%' }}
            >
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/masonry" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/cemetery" variant="contained" className={classes.button} style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
              >
                Buy {TOMB_TICKER}
              </Button>
              <Button variant="contained" target="_blank" href={buyTShareAddress} className={classes.button}>
                Buy {TSHARE_TICKER}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10 }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>{TOMB_TICKER}</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask(TOMB_TICKER);
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol={TOMB_TICKER} size={128} />
                </CardIcon>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Current Price
              </span>
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.--'} FTM</span>
              </Box>
              <Box>
                <span style={{ color: '#030303', fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius: 10 }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>{TSHARE_TICKER}</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask(TSHARE_TICKER);
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol={TSHARE_TICKER} size={128} />
                </CardIcon>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Current Price
              </span>
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.--'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', color: '#030303' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius: 10 }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>{TBOND_TICKER}</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask(TBOND_TICKER);
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol={TBOND_TICKER} size={128} />
                </CardIcon>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Current Price
              </span>
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.--'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', color: '#030303' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius: 10 }}>
            <CardContent align="center">
              <h2>{TOMB_TICKER}-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol={`${TOMB_TICKER}-FTM-LP`} size={128} />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} {TOMB_TICKER} /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box style={{ color: '#030303' }}>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)',borderRadius: 10 }}>
            <CardContent align="center">
              <h2>{TSHARE_TICKER}-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol={`${TSHARE_TICKER}-FTM-LP`} size={128} />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} {TSHARE_TICKER} /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box style={{ color: '#030303' }}>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px', color: '#030303' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
