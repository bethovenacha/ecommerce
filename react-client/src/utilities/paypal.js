const script_to_head = (attributes_object) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      for (const name of Object.keys(attributes_object)) {
        script.setAttribute(name, attributes_object[name]);
      }
      document.head.appendChild(script);
      script.addEventListener('load', resolve);
      script.addEventListener('error', reject);
    });
}

const getAccessToken = async (req, reply)=> {
  const response = await fetch('http://localhost:3000/getAccessToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({})
  });
  
  const text = await response.text(); // ← first read as text for debugging
  try {
    const data = JSON.parse(text);
    return data.access_token;
  } catch (err) {
    console.error('Failed to parse JSON:', err);
    return null;
  }  
}

  

export {script_to_head,getAccessToken};