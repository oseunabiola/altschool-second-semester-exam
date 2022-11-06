import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom/dist";
import ErrorBoundary from "./components/ErrorBoundary";
import PageNotFound from "./components/PageNotFound";
import Repo from "./pages/Repo";
import Repos from "./pages/Repos";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="p-3 text-danger">
          <Link to="/error-boundary">Error boundary page</Link> |{" "}
          <Link to="/not-found">404 Page</Link>
        </div>
        <Routes>
          <Route path="/error-boundary" element={<ErrorBoundaryPage />} />
          <Route path="/repos" element={<NestedRouteParent />}>
            <Route index element={<Repos />} />
            <Route path="" element={<Repos />} />
            <Route path=":name" element={<Repo />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

function ErrorBoundaryPage() {
  throw "Oops! Something went wrong!";
}

function NestedRouteParent() {
  return <Outlet />;
}
