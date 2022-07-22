import { css } from '@emotion/react';
import Editor from '@monaco-editor/react';
import { Preview } from '@mui/icons-material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/landingPage/ResponsiveAppBar';
import { Message } from '../components/messenger/main/ChatHistory';

const menuItems = [
  {
      title: 'Messenger App',
      target: '_self',
      link: '/messenger'
  },
  {
      title: 'Login',
      target: '_blank',
      link: '/login'
  },
  {
      title: 'Sign Up',
      target: '_blank',
      link: '/register'
  },
  {
      title: 'GitHub',
      target: '_blank',
      link: 'https://github.com/stracciatella27/markdown-messenger#readme'
  }
]

const styles = {
  root: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    section{
      width: 100%;
    }

    h1{
      font-weight: lighter;
      font-size: 2.5em;
      text-align: center;
    }
  `,

  header: css`width: 100vw;`,

  titleSection: css`
    margin-top: 1em;
    width: 100vw;
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    h1{
      margin: 0;
      max-width: 800px;
      color: white;
      display: flex;
      align-items: center;

      ::before{
        position: absolute;
        left: 0;
        content: '';
        width: 100%;
        height: 300px;
        background-color: #151515;
        z-index: -1;
        animation: flyIn 0.5s ease;

        @keyframes flyIn {
          from{
            width: 0;
          }
          to{
            width: 100%;
          }
        }
      }
    }

    .imageContainer{
      display: inherit;
      box-shadow: 0px 0px 20px 5px black;
    }
  `,

  aboutSection: css`
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    h1{
      width: 100%;
      padding: 0 1em;
    }

    iframe{
      width: 60vw;
      height: calc(1080/1920*60vw);
    }
  `,

  howItWorksSection: css`
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    h1{
      width: 100%;
    }

    & > div{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1em;
      padding: 1em;

      span{
        background-color: #1e1e1e;
        color: white;
        padding: 1em;
        border-radius: 5px;
        word-break: break-all;
      }
    }
  `,

  poweredBySection: css`
    margin: 2em 0 6em 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    h1{
      width: 100%;
    }

    div{
      display: inherit;
      flex-wrap: wrap;
      gap: 4em;
      justify-content: center;
    }
  `

}

const logoHeight = 100;
const titleImagewidth = 600;
const messagePreview = `
  <img src='https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif' />

  ## 👌 Markdown Syntax
  Features full HTML support! 
`;

const LandingPage = () => {
  const [titleSectionHeight, setTitleSectionHeight] = useState(1000);

  useEffect(()=>{
    setTitleSectionHeight(window.innerHeight - (document.getElementById('app_bar')?.clientHeight as number));
  }, []);

  return <div css={styles.root}>
    <header css={styles.header} id='app_bar'>
      <ResponsiveAppBar menuItems={menuItems}/>
    </header>
    
    <main>
      <section css={css`${styles.titleSection} height: ${titleSectionHeight}px;`}>
          <h1>
            The Worlds Most Highly Customizable Online Messenger.
          </h1>
        <div className='imageContainer'>
          <Image className='image' src="/images/landing-page-laptop.jpeg" width={`${titleImagewidth}`} height={`${960/1200*titleImagewidth}px`} alt="Developer Laptop" priority/>
        </div>
      </section>
      <section css={styles.aboutSection}>
        <h1>🔥🔥🔥 This Messenger Enables You to Program Custom Messages!</h1>
        <iframe src="https://www.youtube-nocookie.com/embed/0KTOn79aWQQ?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=0KTOn79aWQQ" title="messenger preview" frameBorder="0" sandbox={undefined}></iframe>
      </section>
      <section css={styles.howItWorksSection}>
        <h1>🧠 How It Works</h1>
        <div>
          <span>
            {`<img src='https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif' />`}
            <br />
            <br />
            ## 👌 Markdown Syntax<br />
            Features full HTML support!   
          </span>
          <Message isBlue={true} message={messagePreview} timestamp={'11:53:27 AM'} />
        </div>
      </section>
      <section css={styles.poweredBySection}>
        <h1>Powered By</h1>
        <div>
          <Image src='/images/TechnologyIcons/nextjs-logo.png' alt='Next.js' width={`${1626/1347*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/socketio-logo.png' alt='socket.io' width={`${1200/600*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/cassandra-logo.jpg' alt='Cassandra' width={`${500/306*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/react-logo.jpg' alt='React' width={`${960/540*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/typescript-logo.png' alt='TypeScript' width={`${740/405*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/mui-logo.png' alt='Material UI' width={`${1400/787*logoHeight}px`} height={`${logoHeight}px`}/>
        </div>
      </section>
    </main>
  </div>;
}

export default LandingPage;