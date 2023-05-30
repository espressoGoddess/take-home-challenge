import { Card, Ratio, Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function ArticlePreview({ title, date, img, description, url, findArticle, searchTerm }) {
  
  const history = useHistory();
  const { match } = useRouteMatch('/full-article/:title');

  const handleClick = () => {
    const article = findArticle(url);
    history.push(`/articles/${searchTerm}/${article.title}`);
  }

  return (
    <Card style={{ width: '24rem' }} className='mt-4'>
      <Ratio aspectRatio={'16x9'}>
        <Card.Img variant="top" src={img}/>
      </Ratio>
      <Card.Body className='mh-17'>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text className='truncate'>{description ? description : 'You will have to click below to find out more'}</Card.Text>
        <Button variant="outline-secondary" onClick={handleClick}>Learn More</Button>
      </Card.Body>
    </Card>
  );
}