import React, { Suspense } from "react";
import { Navigate, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));
const NotFound = React.lazy(() => import("./components/pages/NotFound"));
const Comments = React.lazy(() => import("./components/comments/Comments"));

const NewQuote = React.lazy(() => import("./components/pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./components/pages/QuoteDetail"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
            <Route
              // path={`${match.path}`}
              path=""
              element={
                <div className="centered">
                  {/* <Link className="btn--flat" to={`${match.url}/comments`}> */}
                  <Link className="btn--flat" to={`comments`}>
                    Load comments
                  </Link>
                </div>
              }
            />
            {/* <Route path={`${match.path}/comments`} element={<Comments />} /> */}
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
