import { Card, Ratio, Button } from "react-bootstrap";
import { useRouteMatch, Link } from "react-router-dom";

export default function ArticlePreview({ title, date, img, description, url}) {
  const match = useRouteMatch('/articles/:searchTerm');

  return (
    <Card style={{ width: '24rem' }} className='mt-4'>
      <Ratio aspectRatio={'16x9'}>
        <Card.Img variant="top" src={img}/>
      </Ratio>
      <Card.Body className='mh-17'>
        <Card.Title className='truncate'>{title}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text className='truncate'>{description ? description : 'You will have to click below to find out more'}</Card.Text>
        <Button as={Link} variant='outline-secondary' to={`/full-article/${encodeURIComponent(title)}`}>Learn More</Button>
      </Card.Body>
    </Card>
  );
}