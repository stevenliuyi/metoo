const url = 'https://metoo-treehole.appspot.com'

export const fetchAllPosts = () =>
  fetch(`${url}/posts/getAll`, {
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
  fetch(`${url}/posts/add`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(res => {
      if (!res.success) {
        console.log(res)
        return null
      } else {
        return res.newPost
      }
    })
    .catch(err => {
      console.log(err)
      return null
    })

export const fetchComments = postId =>
  fetch(`${url}/comments/get/${postId}`, {
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

export const submitComment = comment =>
  fetch(`${url}/comments/add`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(res => {
      if (!res.success) {
        console.log(res)
        return null
      } else {
        return res.newComment
      }
    })
    .catch(err => {
      console.log(err)
      return null
    })