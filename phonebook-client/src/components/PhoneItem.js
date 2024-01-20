import { faArrowRotateLeft, faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";


export default function PhoneItem({ user, Delete }) {
    const submit = (user) => {
        confirmAlert({
            title: 'KONFIRMASI UNTUK HAPUS',
            message: `Apakah anda yakin menghapus data ini '${user.name}'`,
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => Delete(user.id)
                },
                {
                    label: 'Tidak'
                }
            ]
        });
    };

    const [edit, setEdit] = useState(false)
    const [newData, setNewData] = useState({ name: user.name, phone: user.phone })

    if (edit) {
        return (
            <div className="container-item">
                <div className="container-item-content">
                    <div className="header-item">
                        <div className="btn-item-img">
                            <button>
                                <img src="data:image/png;base64,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" />
                            </button>
                        </div>
                    </div>
                    <div className="body-item-edit">
                        <div className="edit-item-identity">
                            <input type="text" value={newData.name} onChange={(event) => setNewData({ ...newData, name: event.target.value })} />
                            <input type="text" value={newData.phone} onChange={(event) => setNewData({ ...newData, phone: event.target.value })} />
                        </div>
                        <div className="btn-item">
                            <button>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={faArrowRotateLeft} onClick={() => { setEdit(false) }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <div className="container-item" key={user.name}>
                <div className="container-item-content">
                    <div className="header-item">
                        <div className="btn-item-img">
                            <Link to={`/avatar/${user.id}`}>
                                <img src={user.avatar == null ? `./default.png` : `../images/${user.avatar}`} />
                            </Link>
                        </div>
                    </div>
                    <div className="body-item">
                        <div className="item-identity">
                            <p>{user.name}</p>
                            <p>{user.phone}</p>
                        </div>
                        <div className="btn-item">
                            <button>
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => { setEdit(true) }} />
                            </button>
                            <button onClick={() => submit(user)} >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}