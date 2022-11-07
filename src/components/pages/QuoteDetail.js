import { Fragment, useEffect} from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";

import Comments from '../comments/Comments';
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api"
import LoadingSpinner from "../UI/LoadingSpinner";


// const DUMMY_QOUTES = [
//     {id: 'q1', author: 'Max', text: 'Learning React'},
//     {id: 'q2', author: 'Jaime', text: 'Learning Angular'},
//   ];

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    const {quoteId} = params
    const {sendRequest, status, data: loadedQuote, error} =useHttp(getSingleQuote, true);

    // const quote = DUMMY_QOUTES.find(quote => quote.id === params.quoteId)

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if(status === 'pending'){
        return (
            <div  className="centered">
                <LoadingSpinner/>
            </div>
        )
    }

    if(error){
        return <p className="centered">{error}</p>
    }

    if (!loadedQuote.text){
        return <p>No quote Found</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={`${match.path}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
};

export default QuoteDetail;