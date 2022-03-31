import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Link } from '@material-ui/core';
import TwitterImage from '../../assets/img/socials/twitter.png';
import TelegramImage from '../../assets/img/socials/telegram.png';
import DiscordImage from '../../assets/img/socials/discord.png';
import YoutubeImage from '../../assets/img/socials/youtube.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    height: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <Typography style={{ color: '#1C8242' }} variant="body2" align="left">
              {'Copyright © '}
              <Link color="inherit" href="/">
                Ranch Finance
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <a
              href="https://twitter.com/ranchfinance"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="twitter" src={TwitterImage} className={classes.img} />
            </a>
            <a href="https://t.me/ranchfinance" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="telegram" src={TelegramImage} className={classes.img} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCGf87DxPzLXwPrfYpXIkaLQ"
              rel="noopener noreferrer"
              target="_blank"
              className={classes.link}
            >
              <img alt="youtube" src={YoutubeImage} className={classes.img} />
            </a>
            <a href="http://discord.ranch.finance/" rel="noopener noreferrer" target="_blank" className={classes.link}>
              <img alt="discord" src={DiscordImage} className={classes.img} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
