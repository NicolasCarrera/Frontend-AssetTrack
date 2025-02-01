import axios from 'axios'

export default function Test() {
  const URL = 'http://localhost:8080/api/v1/users/test'
  const getButton = async () => {
    // 1. GET Request
    axios.get(URL)
      .then(response => {
        console.log('GET Response:', response.data);
      })
      .catch(error => {
        console.error('Error in GET request:', error);
      });
  }
  const postButton = async () => {
    // 2. POST Request
    axios.post(URL)
      .then(response => {
        console.log('POST Response:', response.data);
      })
      .catch(error => {
        console.error('Error in POST request:', error);
      });
  }
  const putButton = async () => {
    // 3. PUT Request
    axios.put(URL)
      .then(response => {
        console.log('PUT Response:', response.data);
      })
      .catch(error => {
        console.error('Error in PUT request:', error);
      });
  }
  const deteleButton = async () => {
    // 4. DELETE Request
    axios.delete(URL)
      .then(response => {
        console.log('DELETE Response:', response.data);
      })
      .catch(error => {
        console.error('Error in DELETE request:', error);
      });
  }

  return (
    <div>
      <button onClick={getButton}>
        Metodo GET
      </button>
      <br />
      <button onClick={postButton}>
        Metodo POST
      </button>
      <br />
      <button onClick={putButton}>
        Metodo PUT
      </button>
      <br />
      <button onClick={deteleButton}>
        Metodo DELETE
      </button>
    </div>
  )
}