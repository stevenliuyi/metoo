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
  fetch(`https://metoo-treehole.appspot.com/comments/get/${postId}`, {
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
  fetch('https://metoo-treehole.appspot.com/comments/add', {
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
