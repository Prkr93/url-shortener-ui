export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrls = (data) => {
  return fetch('http://localhost:3001/api/v1/urls',{
    method: 'POST',
    headers: 'content-type:application/json',
    body: JSON.stringify(data)
  }).then(res => console.log(res))
}
