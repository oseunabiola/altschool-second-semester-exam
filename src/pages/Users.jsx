import { useEffect, useState } from "react";

function makeUsers(users) {
  const result = [];

  for (let i = 0; i < users.length; i++) {
    const {
      name,
      gender,
      email,
      phone,
      picture: { thumbnail },
    } = users[i];
    result.push({ name, gender, email, phone, thumbnail });
  }

  return result;
}

export default function Users() {
  const [users, setUsers] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const rowsPerPage = 10;
  const totalResults = 500;
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const lastUserIndex = currentPage * rowsPerPage;
  const firstUserIndex = lastUserIndex - rowsPerPage;

  useEffect(() => {
    async function loadUsers() {
      try {
        const apiCallResponse = await fetch(`https://randomuser.me/api/?results=${totalResults}`);
        const apiCallResponseJson = await apiCallResponse.json();

        setUsers(makeUsers(apiCallResponseJson.results));
      } catch (error) {
        throw new Error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();

    return () => {
      setUsers(undefined);
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="container p-1">
      <div className="text-center">
        Page {currentPage} of {totalPages}
      </div>
      <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <div className="d-flex flex-wrap">
        {users?.slice(firstUserIndex, lastUserIndex)?.map((_user, index) => (
          <div className="user col-4" key={index}>
            <div className="container my-2 border-1 p-1 rounded-1">
              <div className="d-flex align-items-center">
                <div
                  className="thumbnail d-flex col-3 pe-2 rounded-1"
                  style={{ overflow: "hidden" }}
                >
                  {_user?.thumbnail ? <img src={_user?.thumbnail} alt="" /> : null}
                </div>
                <div className="details fs-6">
                  <p>
                    {_user?.name.first} {_user?.name.last}
                  </p>
                  <small>
                    <i>{_user?.email}</i>
                    <p>
                      <span className="text-gray fw-700">GENDER: </span>
                      {_user?.gender}
                    </p>
                    <p>
                      <span className="text-gray fw-700">PHONE: </span>
                      {_user?.phone}
                    </p>
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="loading d-flex">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="container p-1">
      <div className="d-flex mx-auto">
        <div className="mx-auto p-1 border-1 rounded-1">
          <button
            className="p-1 me-1"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="p-1 me-1"
            onClick={() => setCurrentPage((prev) => prev - 1 || 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <select
            className="me-1"
            onChange={(e) => setCurrentPage(+e.target.value)}
            value={+currentPage}
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
            className="p-1 me-1"
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="p-1 me-1"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
