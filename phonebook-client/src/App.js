import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.css';
import PhoneBox from './components/PhoneBox';
import FormAdd from './components/FormAdd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormUpdateAvatar from './components/FormUpdateAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [user, setUser] = useState({ name: '', phone: '' })
  const [keyword, setKeyword] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [sort, setSort] = useState('asc')
  const [isLoading, setIsloading] = useState(false)
  const [item, setItem] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)




  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/phonebook', {
          params: {
            keyword: keyword,
            sort: sort
          }
        })
        const { phonebook, pages } = response.data

        if (phonebook) {
          setItem(phonebook)
          setTotalPages(pages)
        }
        return
      } catch (error) {
        throw error
      }
      finally {
        setIsloading(false)
      }
    }
    readData()
  }, [keyword, sort])

  const updateData = (id, { name, phone }) => {
    axios.put(`http://localhost:3001/api/phonebook/${id}`, { name, phone }).then((response) => {
      setItem((prevData) => {
        return [
          ...prevData.filter(data => data.id !== response.data.id),
          {
            id: response.data.id,
            name: response.data.name,
            phone: response.data.phone,
            avatar: response.data.avatar
          }
        ]
      })
    }).catch((error) => {
      window.alert(error, 'your cant update')
    })
  }
  function DeleteItem(userId) {
    axios.delete(`http://localhost:3001/api/phonebook/${userId}`).then((response) => {
      setItem(item.filter(data => data.id !== userId))
    }).catch(error => window.alert(error, 'your cant delete'))
  }



  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route index element={<PhoneBox
            Delete={DeleteItem}
            UpdateData={updateData}
            page={page}
            setPage={setPage}
            sort={sort}
            setSort={setSort}
            keyword={keyword}
            setKeyword={setKeyword}
            user={user}
            setUser={setUser}
            item={item}
            setItem={setItem}
            isLoading={isLoading}
            setIsloading={setIsloading} />} />
          <Route path="/add" element={<FormAdd
            user={user}
            setUser={setUser}
            item={item}
            setItem={setItem}
            sort={sort}
            setSort={setSort} />} />
          <Route path='/:id/avatar' element={<FormUpdateAvatar avatar={avatar} setAvatar={setAvatar} item={item} user={user} />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  )
}

function Layout() {
  return (
    <Outlet />
  )
}

function NoMatch() {
  return (
    <div className='nomatch'>
      <h2>Nothing to see here!</h2>
      <h1>
        <FontAwesomeIcon icon={faArrowDown} />
      </h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
