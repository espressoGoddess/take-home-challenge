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
    return articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
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
      return (
        <>
          <h1 className='mt-3'>You are currently viewing the top headlines for the US</h1>
          {createArticles(articles)}
        </>
      );
    } else if (filterArticles(articles).length) {
      return (
      <>
        <h1 className='mt-3'>You are currently viewing articles that match '{searchTerm}'</h1>
        <div className='d-flex'>
          <Button variant='outline-secondary' onClick={() => setSearchTerm('top-headlines')}>Reset Search</Button>

        </div>
        {createArticles(filterArticles(articles))}
      </>
      );
    } else {
      return (
      <>
        <h1 className='mt-3'>Sorry there are no articles matching '{searchTerm}'</h1>
        <Button variant='outline-secondary' onClick={() => setSearchTerm('top-headlines')}>Reset Search</Button>
      </>
      );
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
            <Route path='/articles/:searchTerm'>
              {getArticles(data.articles)}
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

export default App;
