import { useHistory } from "react-router-dom";

import QuoteForm from "../quotes/QuoteForm";
import { addQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";


const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote)
    const history = useHistory();

    useEffect(() => {
        if(status === 'completed'){
            history.push('/quotes');
        }
    }, [status, history]);

    const AddQuoteHandler = quoteData =>{
        sendRequest(quoteData)
    }

    return <QuoteForm isLoading={status === 'pending'} onAddQuote={AddQuoteHandler}/>
};

export default NewQuote;