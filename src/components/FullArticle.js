import { useRouteMatch } from "react-router-dom";

export default function FullArticle() {

  const match = useRouteMatch('/full-article/:title');
  console.log('FA', match)
 return (
  <p>hi</p>
 ) ;
}