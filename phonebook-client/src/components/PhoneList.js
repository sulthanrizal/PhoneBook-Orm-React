import PhoneItem from "./PhoneItem"




export default function PhoneList({ item, setItem, Delete }) {

    return (
        <div className="phonelist" >
            {item.map((user) => {
                return <PhoneItem key={user.id} item={item} setItem={setItem} user={user} Delete={Delete} />
            })
            }
        </div>
    )
}

