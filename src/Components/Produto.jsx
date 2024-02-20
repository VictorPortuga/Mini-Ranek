import React from 'react';
import styles from './Produto.module.css';
import { useParams } from 'react-router-dom';
import Head from './Head';

const Produto = () => {
  const [produto, setProdutos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchProdutos = async (url) => {
      try {
        setLoading(true);
        const r = await fetch(url);
        const json = await r.json();
        setProdutos(json);
      } catch (erro) {
        console.log('Ocorreu um erro');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <p>{error}</p>;
  if (produto === null) return null;
  return (
    <section className={styles.produto + ' animeLeft'}>
      <Head
        title={`Ranek | ${produto.nome}`}
        description={`Esse é o produto: ${produto.nome}`}
      />
      {produto.fotos.map((foto) => (
        <img key={foto.src} src={foto.src} alt={foto.titulo} />
      ))}
      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>{produto.preco}</span>
      </div>
    </section>
  );
};

export default Produto;
