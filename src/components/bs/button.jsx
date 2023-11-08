import Button from 'react-bootstrap/Button';

export function ButtonMain({ children, ...props }) {
    return (
        <>
            <Button variant="mainCl" {...props}>
                {children}
            </Button>
        </>
    );
}