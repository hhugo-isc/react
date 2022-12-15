import { Navigate, Link, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import AllQuotes from "./components/pages/AllQuotes";
import NewQuote from "./components/pages/NewQuote";
import NotFound from "./components/pages/NotFound";
import QuoteDetail from "./components/pages/QuoteDetail";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
