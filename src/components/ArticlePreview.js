import { Card, Ratio, Button } from "react-bootstrap";

export default function ArticlePreview({ title, date, img, description }) {

  return (
    <Card style={{ width: '24rem' }} className='mt-4'>
      <Ratio aspectRatio={'16x9'}>
        <Card.Img variant="top" src={img}/>
      </Ratio>
      <Card.Body className='mh-17'>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text className='truncate'>{description ? description : 'You will have to click here to find out more'}</Card.Text>
        <Button variant="outline-secondary">Learn More</Button>
      </Card.Body>
    </Card>
  );
}