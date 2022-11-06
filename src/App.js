import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Repo from "./pages/Repo";
import Repos from "./pages/Repos";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="">
          {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
            <Routes>
              <Route path="/" element={<Navigate to="/repos" />} />
              <Route path="/repos" element={<Repos />}>
                <Route index element={<Repos />} />
                <Route path=":id" element={<Repo />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        {/* </div> */}
      </Router>
    </ErrorBoundary>
  );
}

function PageNotFound() {
  return <div>404, missing</div>;
}
