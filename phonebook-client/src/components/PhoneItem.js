import { faArrowRotateLeft, faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";

export default function PhoneItem({ user, Delete, UpdateData }) {
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
                            <Link to={`/${user.id}/avatar`}>
                                <img src={"http://localhost:3001/images/" + (user.avatar == null ? './default.png' : `${user.avatar}`)} />
                            </Link>
                        </div>
                    </div>
                    <div className="body-item-edit">
                        <div className="edit-item-identity">
                            <input type="text" value={newData.name} onChange={(event) => setNewData({ ...newData, name: event.target.value })} />
                            <input type="text" value={newData.phone} onChange={(event) => setNewData({ ...newData, phone: event.target.value })} />
                        </div>
                        <div className="btn-item">
                            <button onClick={() => { UpdateData(user.id, { name: newData.name, phone: newData.phone }); setEdit(false) }}>
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
                            <Link to={`/${user.id}/avatar`}>
                                <img src={"http://localhost:3001/images/" + (user.avatar == null ? `./default.png` : `${user.avatar}`)} />
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