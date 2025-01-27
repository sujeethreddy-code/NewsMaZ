import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        if (Array.isArray(data.articles)) {
          setArticle(data.articles);
        } else {
          setArticle([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setArticle([]); 
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {/* Check if article is an array before calling map */}
      {Array.isArray(article) && article.length > 0 ? (
        article.map((news, index) => {
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })
      ) : (
        <p>No articles found</p> 
      )}
    </div>
  );
};

export default NewsBoard;
