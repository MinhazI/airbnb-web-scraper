import Image from "next/image";
import iArticles from "../interfaces/iArticles";

interface props {
  articles: iArticles[];
}

const Grid = ({ articles }: props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 my-5">
      {articles?.map((article, index) => (
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          key={index}
        >
          <a href={article.link} target="_blank">
            <Image
              className="rounded-t-lg object-cover"
              src={article.image}
              alt={article.title}
              width={500}
              height={100}
              style={{
                height: "200px",
              }}
            />
          </a>
          <div className="p-5">
            <small className="text-gray-400">Posted On: {article.date}</small>
            <a href={article.link} target="_blank">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
            </a>
            <a
              href={article.link}
              target="_blank"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
            >
              Read article
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
