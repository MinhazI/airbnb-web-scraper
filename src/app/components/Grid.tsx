import iListings from "../interfaces/iListings";

interface props {
  listings: iListings[];
}

const Grid = ({ listings }: props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {listings?.map((listings, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 text-center"
        >
          <h3 className="text-blue-950 text-lg font-semibold mb-2">
            {listings.title}
          </h3>
          <p className="text-gray-600">{listings.price}</p>
          <a
            href={listings.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue hover-underline"
          >
            View Listing
          </a>
        </div>
      ))}
    </div>
  );
};

export default Grid;
