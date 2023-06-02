import './App.css';
import ArticlePreview from './ArticlePreview';
import FullArticle from './FullArticle';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import Search from './Search';
import apiCalls from '../api-calls';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('top-headlines');
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    apiCalls('https://newsapi.org/v2/top-headlines?country=us&apiKey=15d3c99d51e4422087e38437ebec740f')
      .then(data => setArticles(data.articles))
      .catch(setError(true));
  }, [])

  const findArticle = (titleToFind) => {
    return articles.find(article => article.title === titleToFind);
  }

  const filterArticles = (articles) => {
    return articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const resetSearch = () => {
    setSearchTerm('top-headlines');
    history.push('/articles/top-headlines');
  }

  const getSearchResults = () => {
    return filterArticles(articles).length ? (
      <>
        <h1 className='mt-3'>You are currently viewing articles that match '{searchTerm}'</h1>
        <div className='d-flex'>
          <Button variant='outline-secondary' onClick={resetSearch}>Reset Search</Button>
        </div>
        {createArticles(filterArticles(articles))}
      </>
    ) : (
      <>
        <h1 className='mt-3'>Sorry there are no articles matching '{searchTerm}'</h1>
        <div className='d-flex'>
          <Button variant='outline-secondary' onClick={resetSearch}>Reset Search</Button>
        </div>
      </>
    );  
  }

  return (
    <main>
      <Container>
        <Row>
          <header className='mt-5 border-bottom pb-4 d-flex justify-content-between flex-column flex-sm-row'>
            <Link to='/'>
              <img alt='logo that says your news now' className='logo' src={require('../logo.png')}/>
            </Link>
            <Switch>
              <Route path='/articles'>
                <Search setSearchTerm={setSearchTerm}/>
              </Route>
              <Route exact path='/'>
                {null}
              </Route>
              <Route path='*'>
                <Button as={Link} variant='outline-secondary' to={`/articles/${searchTerm}`}>Go Back</Button>
              </Route>
            </Switch>
          </header>

          <Switch>
            <Route exact path='/'>
              <div className='d-flex flex-column align-items-center'>
                <h1 className='mt-5'>Welcome to Your News Now</h1>
                <p></p>
                <Button className='mt-5' as={Link} variant='outline-secondary' to='/articles/top-headlines'>See Top Articles</Button>
              </div>
            </Route>
            <Route exact path='/articles/top-headlines'>
              <h1 className='mt-3'>You are currently viewing the top headlines for the US</h1>
              {createArticles(articles)}
            </Route>
            <Route path='/articles/:searchTerm'>
            {getSearchResults()}
            </Route>
            <Route path='/full-article/:title'>
              <FullArticle findArticle={findArticle} searchTerm={searchTerm}/>
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