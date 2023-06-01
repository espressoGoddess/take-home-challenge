import { Card, Col, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

export default function FullArticle({ findArticle, searchTerm }) {

  let article;
  const match = useRouteMatch('/full-article/:title');
  if(match) {
    article = findArticle(decodeURIComponent(match.params.title))
  }
  
  if (article) {
    return (
    <Col>
    <div className='mt-3 mb-2 d-flex justify-content-between align-items-center'>
      <p>{article.publishedAt}</p>
      <Button className='mb-2' variant='outline-secondary' as={Link} to={`/articles/${searchTerm}`}>Go Back</Button>
    </div>
    <div className='text-center'>
      <h1 className='m-2 text-start ms-4'>{article.title}</h1>
      <img className='large-img' src={article.urlToImage}/>
      <div>
        <p>By {article.author}</p>
        <p>{article.content}</p>
      </div>
    </div>
    </Col>
  );
 } return (<h2>Loading...</h2>);
}