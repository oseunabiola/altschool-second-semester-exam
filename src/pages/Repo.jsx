import { useState } from "react";

function Repo({ id }) {
  const [loading, setIsLoading] = useState(true);
  const [repo, setRepo] = useState({});

  return <div>{JSON.stringify(repo)}</div>;
}

export default Repo;
