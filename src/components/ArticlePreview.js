import { Card } from "react-bootstrap";

export default function ArticlePreview({ title, date, img, description }) {

  return (
    <Card style={{ width: '24rem' }}>
      <Card.Img src={img}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}