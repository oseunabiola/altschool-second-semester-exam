import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function Repo() {
  const [isLoading, setIsLoading] = useState(true);
  const [repo, setRepo] = useState({});
  const [fetchError, setFetchError] = useState(undefined);
  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRepo() {
      try {
        const payload = await fetch(`https://api.github.com/repos/oseunabiola/${name}`);
        const result = await payload.json();
        if (result.message) throw new Error("Repo not found");
        setRepo(result);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepo();
  }, [name]);

  if (isLoading) return <Loader />;

  if (fetchError)
    return (
      <div className="d-flex mx-auto col-10 col-md-8 col-lg-6">
        <div className=" my-5 mx-auto">{fetchError}</div>
      </div>
    );

  return (
    <div className="m-3 col-12 col-md-10 col-lg-6 mx-auto">
      <div className="border-1 p-3 my-5 rounded">
        <div className="mb-4">
          <div className="d-flex align-items-center">
            <a className="me-2" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <h1 className="h3">{repo.full_name}</h1>
            </a>
            <i className="text-muted bi bi-box-arrow-up-right"></i>
          </div>
          <div className="text-muted d-flex align-items-center fs-6">
            <small className="d-inline-flex fw-bold rounded-pill border-1 px-2 me-3">
              {repo.private ? "Private" : "Public"}
            </small>
            <small className="me-3">
              {repo.parent ? (
                <span>
                  forked from: <a href={`${repo.parent.html_url}`}>{`${repo.parent.full_name}`}</a>
                </span>
              ) : null}
            </small>
            <div className="me-3">
              <small>Forks: {repo.forks}</small>
            </div>
            <div>
              <small>Last updated: {new Date(repo.updated_at).toDateString()}</small>
            </div>
          </div>
        </div>
        <div>{repo.description ?? "No description for this repo"}</div>
        <div className="my-3">
          <button
            className="py-2 px-4 rounded"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repo;
