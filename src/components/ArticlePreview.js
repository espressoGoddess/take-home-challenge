import { DateTime } from "luxon";
import { Card, Ratio, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ArticlePreview({ title, date, img, description }) {

  return (
    <Card style={{ width: '24rem' }} className='mt-4'>
      <Ratio aspectRatio={'16x9'}>
        <Card.Img variant="top" src={img}/>
      </Ratio>
      <Card.Body className='mh-17'>
        <Card.Title className='truncate'>{title}</Card.Title>
        <Card.Text>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED)}</Card.Text>
        <Card.Text className='truncate'>{description ? description : 'You will have to click below to find out more'}</Card.Text>
        <Button as={Link} variant='outline-secondary' to={`/full-article/${encodeURIComponent(title)}`}>Learn More</Button>
      </Card.Body>
    </Card>
  );
}