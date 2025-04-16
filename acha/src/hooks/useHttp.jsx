async function useHttp({url, method = 'GET', data, contentType = 'application/json'}, body) {
    try {
      // Set up the fetch options
      const getOptions = {
        method: method,  // HTTP method (GET, POST, etc.)
        headers: {
          'Content-Type': contentType, // set content type (default to 'application/json')
        } 
      };
      
      if(method == 'GET'){
        const response = await fetch(url, getOptions);
        return response.json();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  export default useHttp;
  