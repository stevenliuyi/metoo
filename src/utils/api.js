import md5 from 'md5'

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:2089'
    : 'https://metoo-treehole.appspot.com'

export const fetchAllPosts = (sortMethod, forTest = false) =>
  fetch(
    `${url}/posts/${forTest ? 'test/' : ''}getAll/${
      sortMethod != null ? sortMethod : ''
    }`,
    {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
  )
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

export const fetchPost = postId =>
  fetch(`${url}/posts/get/${postId}`, {
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

export const deletePost = (postId, adminKey) =>
  fetch(`${url}/posts/delete/${postId}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ adminKey: md5(adminKey) })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

export const recoverPost = (postId, adminKey) =>
  fetch(`${url}/posts/recover/${postId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ adminKey: md5(adminKey) })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

export const fetchComments = (postId, forTest = false) =>
  fetch(`${url}/comments/${forTest ? 'test/' : ''}get/${postId}`, {
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

export const deleteComment = (postId, commentId, adminKey) =>
  fetch(`${url}/comments/delete/${postId}/${commentId}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ adminKey: md5(adminKey) })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })

export const recoverComment = (postId, commentId, adminKey) =>
  fetch(`${url}/comments/recover/${postId}/${commentId}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ adminKey: md5(adminKey) })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      return null
    })
