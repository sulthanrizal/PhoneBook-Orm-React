// import { faArrowDownZA, faArrowUpAZ, faArrowUpZA, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownZA, faArrowUpZA, faUserPlus, } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"



const ButtonSortAsc = ({ sort, setSort }) => {
    return (
        <button className='btnSortAsc' onClick={() => {
            setSort('desc')
        }}>
            <FontAwesomeIcon icon={faArrowDownZA} id='center' />
        </button>
    )
}

const ButtonSortDesc = ({ sort, setSort }) => {
    return (
        <button className='btnSortDesc' onClick={() => {
            setSort('asc')
        }}>
            <FontAwesomeIcon icon={faArrowUpZA} id='center' />
        </button>
    )
}

const ButtonAdd = () => {
    return (
        <button className='btnAdd'>
            <FontAwesomeIcon icon={faUserPlus} />
        </button>
    )
}

export default function FormBar({ keyword, setKeyword, sort, setSort }) {
    const handleSearch = (event) => {
        const { value } = event.target
        setKeyword(value)
    }
    return (
        <div className='container-formbar'>
            <div className="container-form">
                {sort === 'asc' || sort.sort == 'asc' ? <ButtonSortAsc sort={sort} setSort={setSort} /> : <ButtonSortDesc sort={sort
                } setSort={setSort} />}
                <input className="input-form" value={keyword} placeholder='search your name' onInput={handleSearch} />
                <Link to='/add'> <ButtonAdd /> </Link>

            </div>
        </div>

    )
}