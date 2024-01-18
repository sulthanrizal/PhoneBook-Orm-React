
import { Link } from "react-router-dom";

export default function FormAdd() {

    // const navigate = useNavigate()
    return (
        <div className="container-form-add">
            <form>
                <input type="text" id="name" name="name" placeholder="insert your name" />
                <input type="text" id="phone" name="phone" placeholder="insert your phone" />
            </form>
            <div className="btn-form-add">
                <button type="submit">save</button>
                <Link to={'/'}>cancel</Link>
            </div>
        </div>

    )
}