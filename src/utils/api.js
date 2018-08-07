export const fetchAllPosts = () =>
  fetch('https://metoo-treehole.appspot.com/posts/getAll', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

export const submitPost = post =>
  fetch('https://metoo-treehole.appspot.com/posts/add', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })
