import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from 'react-router-dom'
// icons 
import { FaUser } from 'react-icons/fa'
import Spinner from "./Spinner"

const Posts = ({ post }) => {

  /** estados para los comentarios */
  const [comments, setComments] = useState({})
  const [loadingComment, setLoadingComment] = useState(false)
  const [success, setSuccess] = useState(false);

  /** estados para informacion del usuario*/
  const [user, setUser] = useState({})
  const [loadingUser, setLoadingUser] = useState(false)

  /** obteniendo comentarios de un post */
  const getComments = (id) => {
    if (Object.keys(comments).length === 0) {
      setLoadingComment(true)
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((res) => {
          setComments({ ...comments, [id]: res.data })
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setLoadingComment(false)
          setSuccess(true);
        })
    } else {
      setSuccess(!success);
    }
  }

  useEffect(() => {
    setLoadingUser(true)
    axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => setLoadingUser(false))
  }, [post])

  return (
    <div className="mb-10" >
      {loadingUser && <Spinner />}
      {!loadingUser &&
        <div className="flex items-center gap-1 w-fit px-2 py-1.5 rounded-md">
          <FaUser className="text-[40px] bg-green-200 p-1 rounded-full" />
          <div className="flex flex-col">
            <Link to={`user/${post.userId}`} className="font-bold cursor-pointer hover:underline" >{user.username}</Link>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
      }
      <h3 className="text-xl font-bold leading-6 mb-3">{post.title}</h3>
      <p>{post.body}</p>
      <button
        onClick={() => getComments(post.id)}
        className={`${success ? 'text-red-500' : 'text-blue-500'} rounded-md underline`}>
        {success ? 'ocultar comentarios' : 'ver comentarios'}
      </button>
      {loadingComment && <p>cargando comentario...</p>}
      {success && comments[post.id]?.map((comment, index) => (
        <div className="my-5 ml-5 md:ml-10" key={index}>
          <div className="flex gap-1">
            <FaUser className="text-[40px] bg-blue-200 p-1 rounded-full w-fit" />
            <div className="flex-1">
              <p className="font-semibold text-gray-600">{comment.email}</p>
              <h4 className="font-medium text-sm">{comment.name}</h4>
              <p className="text-sm mt-2">{comment.body}</p>
              <button className="underline text-sm mr-5">me gusta</button>
              <button className="underline text-sm">responder</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts