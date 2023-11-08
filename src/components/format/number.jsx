import { NumericFormat } from "react-number-format"


const NumberFormat = ({value, currency, ...props}) => {
    return (
        <NumericFormat
            displayType="text"
            value={value}
            thousandsGroupStyle="thousand"
            thousandSeparator="."
            decimalSeparator=","
            prefix={currency === 2 ? '$' : ''}
            suffix={currency === 1 ? 'đ' : ''}
            {...props}
            />
    )
}

export default NumberFormat