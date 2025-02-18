import iArticles from "../interfaces/iArticles";

interface props {
  articles: iArticles[];
}

const Grid = ({ articles }: props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {articles?.map((article, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 text-center"
        >
          <h3 className="text-blue-950 text-lg font-semibold mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600">{article.image}</p>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue hover-underline"
          >
            View Article
          </a>
        </div>
      ))}
    </div>
  );
};

export default Grid;
