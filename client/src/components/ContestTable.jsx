import { useState } from "react";
import "../styles/ContestTable.css";

const ContestTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 10;

  const totalPages = Math.ceil((data?.length || 0) / contestsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * contestsPerPage;
  const currentContests = data?.slice(startIndex, startIndex + contestsPerPage) || [];

  if (!data || data.length === 0) {
    return (
      <div className="ct-container">
        <h3 className="ct-title">Contest History</h3>
        <p className="ct-no-data">No contest data available.</p>
      </div>
    );
  }

  return (
    <div className="ct-container">
      <div className="ct-table-wrapper">
        <table className="ct-table">
          <thead>
            <tr>
              <th>Contest ID</th>
              <th>Contest Name</th>
              <th>Rank</th>
              <th>Old Rating</th>
              <th>New Rating</th>
              <th>Change</th>
              <th>Unsolved</th>
            </tr>
          </thead>
          <tbody>
            {currentContests.map((contest, index) => (
              <tr key={index}>
                <td>{contest.contestId}</td>
                <td style={{ wordBreak: "break-word", maxWidth: "100px" }}>{contest.contestName}</td>
                <td>{contest.rank}</td>
                <td>{contest.oldRating}</td>
                <td>{contest.newRating}</td>
                <td
                  style={{
                    color: contest.ratingChange > 0 ? "green" : "red",
                    fontWeight: "600",
                  }}
                >
                  {contest.ratingChange > 0 ? `+${contest.ratingChange}` : contest.ratingChange}
                </td>
                <td>{contest.unsolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ct-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ContestTable;
