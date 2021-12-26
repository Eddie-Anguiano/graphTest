import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(props) {
  const text = "hIt should also be clear as to why we are going to be basing our transition off height. A similar affect can be created using the max-height attribute, where the maximum height is set to some value that should never be set. This has a critical issue: in order to give a consistent transition speed, you need to set a height that is not too high so that the effect is not over emphasized. To do this, while at the same time being high enough not to ever cause a scroll bar to show up in the text display area usually leads to a lot of hand waving, ending with a magic number for max height that eventually becomes code no one, including yourself, wants to touch or change.In order to properly apply transition CSS, you can note use property value auto, so in order to use height, we need to determi"
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [heightCurr, setHeightCurr] = useState('72px');
  const [heightMax, setHeightMax] = useState(72);
  const [heightMin, setHeightMin] = useState(72);


  const handleClickBtn = () => {
    setHeightCurr(isExpanded ? `${heightMin}px` : `${heightMax}px`);
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (document) {
      const element = document.querySelector(".test");
      const clientHeight = element?.clientHeight || 72;
      const scrollHeight = element?.scrollHeight || 72;

      if (scrollHeight > clientHeight) {
        setIsOverflow(true);
        setHeightMax(scrollHeight);
        setHeightMin(clientHeight);
        setHeightCurr(`${clientHeight}px`);
      } else {
        setHeightCurr('auto');
      }
    }
    
  }, [text]);
  
  

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* {JSON.stringify(props)} */}
        <h1>main branch</h1>
        <div className='test' style={{ height: `${heightCurr}` }}>
          {text}
        </div>
        { isOverflow && <ToggleButton isExpanded={isExpanded} onClick={handleClickBtn}/>}
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {isExpanded ? "Show Less" : "Show More"}
    </button>
  );
};

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://live-headless-puvu.pantheonsite.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query {
      article(id: 2) {
        title,
        author
      }
    }`,
  });

  return {
    props: {
      artice: data
    }
  }
}
