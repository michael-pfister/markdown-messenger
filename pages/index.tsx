import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/landingPage/ResponsiveAppBar';

const menuItems = [
  {
      title: 'Messenger App',
      link: '/messenger'
  },
  {
      title: 'Login',
      link: '/login'
  },
  {
      title: 'Sign Up',
      link: '/register'
  },
  {
      title: 'GitHub',
      link: 'https://github.com/stracciatella27/markdown-messenger'
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
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    h1{
      width: 50vw;
    }

    div{
      margin: 2em;
    }
  `,

  poweredBySection: css`
    margin: 4em 0;
    display: flex;
    flex-wrap: wrap;
    
    h1{
      width: 100%;
    }

    div{
      margin-top: 2em;
      display: inherit;
      flex-wrap: wrap;
      gap: 4em;
      justify-content: center;
    }
  `

}

const logoHeight = 100;

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
        <h1>The Worlds Most Highly Customizable Online Messenger.</h1>
        <div>
          <Image src="/images/landingPageLaptop.webp" width="500px" height={`${1440/2560*500}px`} alt="Minimalist art of laptop with Visual Studio Code"/>
        </div>
      </section>
      <section css={styles.poweredBySection}>
        <h1>Powered By</h1>
        <div>
          <Image src='/images/TechnologyIcons/nextjs-logo.png' alt='Next.js' width={`${1626/1347*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/react-logo.jpg' alt='React' width={`${960/540*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/cassandra-logo.png' alt='Cassandra' width={`${602/401*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/typescript-logo.png' alt='TypeScript' width={`${740/405*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/docker-logo.png' alt='Docker' width={`${400/331*logoHeight}px`} height={`${logoHeight}px`}/>
          <Image src='/images/TechnologyIcons/mui-logo.png' alt='Material UI' width={`${1400/787*logoHeight}px`} height={`${logoHeight}px`}/>
        </div>
      </section>
    </main>
  </div>;
}

export default LandingPage;