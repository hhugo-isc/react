// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuoteForm from "./../quotes/QuoteForm";

import useHttp from "./../../hooks/useHttp";
import { addQuote } from "./../../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      // history.push("/quotes");
      navigate("/quotes");
    }
    // }, [status, history]);
  }, [status, navigate]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
