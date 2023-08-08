import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom'

const UserPage = () => {

  const { id } = useParams();

  /** estados para informacion del usuario*/
  const [user, setUser] = useState({})
  const [loadingUser, setLoadingUser] = useState(true)
  console.log(user);

  useEffect(() => {
    setLoadingUser(true)
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => setLoadingUser(false))
  }, [id])

  return (
    <main className="bg-white md:w-10/12 mx-auto lg:w-8/12 xl:w-6/12 h-screen">
      <Link to='/' className='text-2xl font-semibold underline' >Volver</Link>
      {loadingUser && <Spinner />}
      {!loadingUser &&
        <div>
          <p className='text-4xl font-bold'>{user.username}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <p>{user.name}</p>
          <div>
            <p>{user.company.name}</p>
            <p>{user.company.bs}</p>
            <p>{user.company.catchPhrase}</p>
          </div>
          <div>
            <p>{user.address.city}</p>
            <p>{user.address.street}</p>
            <p>{user.address.zipcode}</p>
            <p>{user.address.suite}</p>
          </div>
        </div>
      }
    </main>
  )
}

export default UserPage