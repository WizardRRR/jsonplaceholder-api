import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
// components
import Posts from "../components/Posts";

const PostPages = () => {

  /** estados del posts */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /** obteniendo posts al renderizar la aplicacion */
  useEffect(() => {
    setIsLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPosts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <main className="bg-white md:w-10/12 mx-auto lg:w-8/12 xl:w-6/12">
        <div className="bg-white py-7 px-4 fixed w-full shadow-md md:w-10/12 lg:w-8/12 xl:w-6/12">
          <h1 className="text-5xl font-extrabold">POSTS</h1>
        </div>
        <div className="overflow-y-auto pt-32 mx-2">
          {isLoading && <div className="text-5xl">CARGANDO...</div>}
          {posts.map((post, index) => <Posts key={index} post={post} />)}
        </div>
      </main>
    </>
  )
}

export default PostPages
