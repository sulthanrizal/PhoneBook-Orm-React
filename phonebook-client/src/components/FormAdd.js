import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function FormAdd({ user, setUser, item, setItem, sort, setSort }) {

    let navigate = useNavigate()
    const addData = () => {
        axios.post('http://localhost:3001/api/phonebook', {
            ...user,
        }).then((response) => {
            setItem((item) => [
                {
                    id: response.data.id,
                    name: response.data.name,
                    phone: response.data.phone
                },
                ...item.filter(data => data.id !== response.data.id)
            ])
        }).catch((err) => {
            throw err
        })
        navigate('/')
    }

    return (
        <form onSubmit={addData}>
            <div className="container-form-add">
                <div className="header-add">
                    <input type="text" placeholder="add your name" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <input type="text" placeholder="add your phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                </div>
                <div className="btn-form-add">
                    <button type="submit" >save</button>
                    <Link to={'/'}>cancel</Link>
                </div>

            </div>
        </form >
    )
}