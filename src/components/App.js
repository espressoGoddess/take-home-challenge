import './App.css';
import { data } from "../top-headlines-mock";
import ArticlePreview from './ArticlePreview';
import FullArticle from './FullArticle';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


function App() {
  const [searchTerm, setSearchTerm] = useState('top-headlines');


  const findArticle = (articleToFindUrl) => {
    return data.articles.find(article => article.url === articleToFindUrl)
  }

  const articles = data.articles.map(article => {
    return (<Col key={article.url}>
      <ArticlePreview
        searchTerm={searchTerm}
        url={article.url}
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
          <Switch>
            <Route exact path='/'>
              <p>landing</p>
            </Route>
            <Route path='/articles/:searchTerm'>
              {articles}
            </Route>
            <Route path='/full-article/:title'>
              <FullArticle />
            </Route>
            <Route exact path='/404'>
              <p>404</p>
            </Route>
            <Route path='*'>
              <Redirect to='/404' />
            </Route>
          </Switch>
        </Row>
      </Container>
    </main>
  );
}

export default App;
