import './App.css';
import { data } from "../top-headlines-mock";
import ArticlePreview from './ArticlePreview';
import FullArticle from './FullArticle';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Search from './Search';


function App() {
  const [searchTerm, setSearchTerm] = useState('top-headlines');

  const findArticle = (titleToFind) => {
    return data.articles.find(article => article.title === titleToFind)
  }

  const filterArticles = (articles) => {
    return articles.filter(article => article.title.includes(searchTerm) || article.title.includes(searchTerm.toLowerCase()))
  }

  const createArticles = (articles) => {
    return articles.map(article => {
      return (<Col key={article.url}>
        <ArticlePreview
          searchTerm={searchTerm}
          url={article.url}
          img={article.urlToImage}
          title={article.title}
          date={article.publishedAt}
          description={article.description}/>
        </Col>)
    });
  }

  const getArticles = (articles) => {
    if (searchTerm === 'top-headlines') {
      return createArticles(articles)
    } else if (filterArticles(articles).length) {
      return createArticles(filterArticles(articles))
    } else {
      return (<h1>Sorry there are no articles matching that search term</h1>);
    }  
  }

  return (
    <main>
      <Container>
        <Row>
          <header className='mt-5 border-bottom pb-4 d-flex justify-content-between'>
            <Link to='/'>
              <img className='logo' src={require('../logo.png')}/>
            </Link>
            <Switch>
              <Route path='/articles/:searchTerm'>
                <Search setSearchTerm={setSearchTerm}/>
              </Route>
              <Route path='/'>
                {null}
              </Route>
              <Route path='*'>
                <Button as={Link} to={`/articles/${searchTerm}`}>Go Back</Button>
              </Route>
            </Switch>
          </header>

          <Switch>
            <Route exact path='/'>
              <p>landing</p>
            </Route>
            <Route path='/articles/:searchTerm'>
              {getArticles(data.articles)}
            </Route>
            <Route path='/full-article/:title'>
              <FullArticle findArticle={findArticle}/>
            </Route>
            <Route exact path='/404'>
              <h1 className='mt-5'>Whoops, it doesn't look like that page exists</h1>
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
