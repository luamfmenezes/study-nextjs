import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import api from "../services/api";

export default function Home({ productsDefault }) {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState(productsDefault);
  const didMount = useRef(false);

  useEffect(() => {
    const getData = async () => {
      console.log("GET NEW DATA");
      const { data } = await api.get("/products");
      setProducts(data);
    };

    if (!didMount.current) {
      didMount.current = true;
    } else {
      getData();
    }
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {products.data.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
      <h1>{page}</h1>
      <button onClick={() => setPage((oldPage) => oldPage + 1)}>
        NEXT PAGE
      </button>
    </div>
  );
}

// It will allow to render the first visualization of the page with the products
// It will be done by the nodejs
// It isnt the static generation, It's the server side
export async function getServerSideProps() {
  const { data } = await api.get("/products");
  return {
    props: {
      productsDefault: data,
    },
  };
}
