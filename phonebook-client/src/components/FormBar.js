// import { faArrowDownZA, faArrowUpAZ, faArrowUpZA, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownZA, faArrowUpZA, faUserPlus, } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"



const ButtonSortAsc = () => {
    return (
        <button className='btnSortAsc'>
            <FontAwesomeIcon icon={faArrowDownZA} />
        </button>
    )
}

const ButtonSortDesc = () => {
    return (
        <button className='btnSortDesc'>
            <FontAwesomeIcon icon={faArrowUpZA} />
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

export default function FormBar() {
    return (
        <div className='container-formbar'>
            <div className="container-form">
                <ButtonSortAsc />
                <input className="input-form" placeholder='search your name' />
                <Link to='/add'> <ButtonAdd /> </Link>

            </div>
        </div>

    )
}