import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Repos() {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [repoOwner, setRepoOwner] = useState({});
  const [fetchError, setFetchError] = useState(undefined);
  const [totalResults, setTotalResults] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const lastUserIndex = currentPage * rowsPerPage;
  const firstUserIndex = lastUserIndex - rowsPerPage;

  useEffect(() => {
    async function fetchRepoOwner() {
      const payload = await fetch("https://api.github.com/users/oseunabiola");
      const result = await payload.json();
      setTotalResults(result.public_repos);
      setRepoOwner(result);
    }

    fetchRepoOwner();
  }, []);

  useEffect(() => {
    async function fetchRepoList() {
      try {
        const payload = await fetch("https://api.github.com/users/oseunabiola/repos");
        const result = await payload.json();
        setRepos(result);
      } catch (error) {
        setFetchError("Oops! Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepoList();
  }, []);

  if (isLoading) return <Loader />;

  if (fetchError)
    return (
      <div className="d-flex mx-auto col-10 col-md-8 col-lg-6">
        <div className=" my-5 mx-auto">{fetchError}</div>
      </div>
    );

  return (
    <div className="m-3 col-12 col-md-10 col-lg-6 mx-auto">
      <div className="repo-owner my-4">
        <RepoOwner repoOwner={repoOwner} />
      </div>
      <div className="mb-5">
        {repos?.slice(firstUserIndex, lastUserIndex)?.map((_repo, index) => (
          <RepoCard repo={_repo} key={index} />
        ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Repos;

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="container p-1">
      <div className="d-flex mx-auto">
        <div className="mx-auto p-1 border-1 rounded-1">
          <button
            className="py-1 px-2 me-1"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
          <button
            className="py-1 px-2 me-1"
            onClick={() => setCurrentPage((prev) => prev - 1 || 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <select
            className="me-1"
            onChange={(e) => setCurrentPage(+e.target.value)}
            value={currentPage}
          >
            {Array(totalPages)
              .fill("")
              .map((_page, index) => (
                <option value={index + 1} key={index}>
                  {index + 1}
                </option>
              ))}
          </select>

          <button
            className="py-1 px-2 me-1"
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages))}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
          <button
            className="py-1 px-2 me-1"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <div className="p-3 border-1 mb-3 rounded" style={{ flex: "" }}>
      <div className="h4">
        <Link to={`${repo.name}`}>{repo.name}</Link>
      </div>
      <div className="text-muted d-flex align-items-center fs-6">
        <small className="d-inline-flex fw-bold rounded-pill border-1 px-2 me-3">
          {repo.private ? "Private" : "Public"}
        </small>
        <div className="me-3">
          <small>Forks: {repo.forks}</small>
        </div>
        <div>
          <small>Last updated: {new Date(repo.updated_at).toDateString()}</small>
        </div>
      </div>
    </div>
  );
}

function RepoOwner({ repoOwner }) {
  return (
    <div className="d-flex align-items-center">
      <div className="col-2">
        <img
          className="img-thumbnail rounded-circle"
          src={`${repoOwner.avatar_url}`}
          alt="Repo owner avatar"
        />
      </div>
      <div className="ps-4">
        <div className="text-muted">
          <div className="d-flex align-items-center">
            <a className="me-2" href={repoOwner.html_url} target="_blank" rel="noopener noreferrer">
              <h1 className="h3 mb-0 text-white">{repoOwner.name}</h1>
            </a>
            <i className="text-muted bi bi-box-arrow-up-right"></i>
          </div>
          <div className="d-flex flex-wrap" style={{ fontSize: "0.8rem" }}>
            <div className="d-flex">
              <div className="d-flex me-2">
                <i className="bi bi-at"> </i>
                {repoOwner.login}
              </div>
              <div className="me-2">
                <i className="bi bi-geo-alt"> </i>
                {repoOwner.location}
              </div>
              <div className="me-3">
                <i className="bi bi-journal-bookmark"> </i>
                {repoOwner.public_repos} public repos
              </div>
              <div className="">
                <i className="bi bi-people"> </i>
                {repoOwner.followers} followers.
                {repoOwner.following} following
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
