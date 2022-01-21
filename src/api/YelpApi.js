import queryString from 'query-string';


export default function getYelpData(queryParams) {
    const query = queryString.stringify(queryParams)       
    return fetch(`${process.env.REACT_APP_BASE_URL}/api?${query}`);  
   console.debug("API CALL:", query)
}


