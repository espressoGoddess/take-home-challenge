import './App.css';
import { data } from "../top-headlines-mock";
import ArticlePreview from './ArticlePreview';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const articles = data.articles.map(article => {
    return (<ArticlePreview
      key={article.url}
      img={article.urlToImage}
      title={article.title}
      date={article.publishedAt}
      description={article.description}/>)
  })

  return (
    <main>
      <Container>
        <Row>
          <Col>
            {articles}
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
