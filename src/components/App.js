import './App.css';
import { data } from "../top-headlines-mock";
import ArticlePreview from './ArticlePreview';

function App() {

  const articles = data.articles.map(article => {
    return (<ArticlePreview key={article.url} title={article.title} date={article.publishedAt} description={article.description}/>)
  })

  return (
    <main>
      {articles}
    </main>
  );
}

export default App;
