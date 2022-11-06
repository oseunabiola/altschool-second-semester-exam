import { useNavigate } from "react-router-dom";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center p-5">
      <div className="col-12 col-sm-10 col-md-6 mb-5 text-center">
        <div className="fw-700 display-1 text-warning">404</div>
        <h1 className="h3">Oops! We can&apos;t find the page you&apos;re looking for.</h1>
        <small>You are not lost. It appears we didn&apos;t make provision for this page</small>
      </div>
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
  );
}
