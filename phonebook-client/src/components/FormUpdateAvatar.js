import { faArrowRotateLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


export default function FormUpdateAvatar({ avatar, setAvatar }) {
    console.log(avatar, 'avatar')
    const { id } = useParams()
    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/phonebook/${id}`)
                const avatar = response.data.avatar

                console.log(response.data)

                setAvatar(avatar)
                console.log(response.data)
            } catch (error) {
                console.log(error, 'ini eror')
            }
        }
        fecthData()
    }, [id])


    return (
        <div className="container-avatar">
            <div className="header-avatar">
                <h1>Change Avatar</h1>
            </div>
            <div className="body-avatar">
                <form>
                    <div className="img-avatar">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" name="avatar" id="avatar" onChange={(e) => {
                            setAvatar(e.target.files[0])
                        }} />
                    </div>
                    <div className="priview">
                        <label>Priview</label>
                        <img src={"http://localhost:3001/images/" + (avatar !== null ? `${avatar}` : './default.png')} />
                    </div>
                </form>
            </div>
            <div className="footer-avatar">
                <button type="submit">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <Link to={'/'}>
                    <button>
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </button>
                </Link>
            </div>
        </div >
    )
}