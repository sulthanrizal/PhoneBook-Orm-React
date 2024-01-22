import PhoneItem from "./PhoneItem"




export default function PhoneList({ item, setItem, Delete, UpdateData }) {

    return (
        <div className="phonelist" >
            {item.map((user) => {
                return <PhoneItem key={user.id} UpdateData={UpdateData} item={item} setItem={setItem} user={user} Delete={Delete} />
            })
            }
        </div>
    )
}



