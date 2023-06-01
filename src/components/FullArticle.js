import { Card, Col, Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

export default function FullArticle({ findArticle }) {

  let article;
  const match = useRouteMatch('/full-article/:title');
  if(match) {
    article = findArticle(match.params.title.split('%20').join(' '))
  }
  
  if (article) {
    return (
    <Col>
    <div className='mt-3 mb-2 d-flex justify-content-between align-items-center'>
      <p>{article.publishedAt}</p>
      <Button className='mb-2' variant='outline-secondary' as={Link} to={`/articles/${searchTerm}`}>Go Back</Button>
    </div>
      <Card>
        <Card.Title className='m-2'>{article.title}</Card.Title>
        <Card.Img src={article.urlToImage}/>
        <Card.Body>
          <Card.Text>By {article.author}</Card.Text>
          <Card.Text>{article.content}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
 } return (<h2>Loading...</h2>);
}