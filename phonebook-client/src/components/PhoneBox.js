import FormBar from "./FormBar";
import PhoneItem from "./PhoneItem";



export default function PhoneBox() {
    return (
        <div className="container">
            <div className="header">
                <FormBar />
            </div>
            <div className="body">
                <PhoneItem />
            </div>
        </div>
    )
}