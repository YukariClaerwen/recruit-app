
import { Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap'

const toast = ({title, description, show}) => {
    return (
        <ToastContainer position="bottom-end">
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <ToastHeader>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{title}</strong>
                    <small>11 mins ago</small>
                </ToastHeader>
                <ToastBody>{description}</ToastBody>
            </Toast>
        </ToastContainer>

    )
}

export default toast