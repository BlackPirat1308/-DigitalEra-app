import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import config from '../config';

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  margin-bottom: 1rem;
`;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/productos`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container>
      <Head>
        <title>{config.websiteName} - {config.companyName}</title>
        <meta name="description" content={`Explora ${config.programName} y descubre cómo podemos ayudarte.`} />
      </Head>

      <Main>
        <h1>Bienvenido a {config.websiteName}</h1>
        <p>Explora {config.programName} y descubre cómo podemos ayudarte.</p>
        
        <h2>Nuestros Productos</h2>
        <ProductList>
          {products.map(product => (
            <ProductItem key={product.id}>
              {product.nombre} - ${product.precio}
            </ProductItem>
          ))}
        </ProductList>
      </Main>
    </Container>
  );
}