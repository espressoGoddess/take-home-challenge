export default function ArticlePreview({ title, date, description }) {

  return (
    <article>
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{description}</p>
    </article>
  );
}