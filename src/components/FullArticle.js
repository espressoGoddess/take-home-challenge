import { Card, Col } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";

export default function FullArticle({ findArticle }) {

  let article;
  const match = useRouteMatch('/full-article/:title');
  if(match) {
    article = findArticle(match.params.title.split('%20').join(' '))
  }
  
  if (article) {
    return (
    <Col>
      <p>{article.publishedAt}</p>
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