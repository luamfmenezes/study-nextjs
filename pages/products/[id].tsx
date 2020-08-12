import React from "react";
import api from "../../services/api";
import { GetStaticPropsContext } from "next";
// import { Container } from './styles';

const Product: React.FC = ({ productDefault }) => {
  return (
    <div>
      <h1>{productDefault.title}</h1>
    </div>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { id } = ctx.params;
  const { data } = await api.get(`/products/${id}`);
  return {
    props: {
      productDefault: data,
    },
    revalidate: 1,
  };
}

// this will construct the static pages
export async function getStaticPaths() {
  const { data } = await api.get(`/products`);
  const paths = data.data.map((product) => `/products/${product.id}`) || [];
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default Product;
