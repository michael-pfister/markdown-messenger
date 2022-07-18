import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/landingPage/ResponsiveAppBar';

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
      font-size: 3em;
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

  poweredBySection: css`
    margin-bottom: 6em;
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
      <section css={styles.poweredBySection}>
        <h1>Powered By</h1>
        <div>
          <Image src='/images/TechnologyIcons/nextjs-logo.png' alt='Next.js' width={`${800/479*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/react-logo.jpg' alt='React' width={`${960/540*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/cassandra-logo.jpg' alt='Cassandra' width={`${500/306*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/typescript-logo.png' alt='TypeScript' width={`${740/405*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/mui-logo.png' alt='Material UI' width={`${1400/787*logoHeight}px`} height={`${logoHeight}px`}/>
        </div>
      </section>
    </main>
  </div>;
}

export default LandingPage;