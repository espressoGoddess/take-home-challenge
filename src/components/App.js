import './App.css';
import { data } from "../top-headlines-mock";
import ArticlePreview from './ArticlePreview';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const articles = data.articles.map(article => {
    return (<Col>
      <ArticlePreview
        key={article.url}
        img={article.urlToImage}
        title={article.title}
        date={article.publishedAt}
        description={article.description}/>
      </Col>)
  })

  return (
    <main>
      <Container>
        <Row>
            {articles}
        </Row>
      </Container>
    </main>
  );
}

export default App;
