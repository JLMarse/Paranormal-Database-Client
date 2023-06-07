import { Spinner } from "react-bootstrap"



const Loader = () => {


    return

    <Spinner animation="grow" role="status" variant="dark">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
}

export default Loader