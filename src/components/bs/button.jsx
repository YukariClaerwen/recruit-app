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

export function ButtonSub({ children, ...props }) {
    return (
        <>
            <Button variant="subCl" {...props}>
                {children}
            </Button>
        </>
    );
}