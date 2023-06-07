import Alert from 'react-bootstrap/Alert';

const FormError = ({ children }) => {
    return (

        <Alert variant='dark' style={{ textAlign: 'center' }}>
            {children}
        </Alert>

    )
}

export default FormError