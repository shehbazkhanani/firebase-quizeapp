import { Switch } from "@mui/material"

function USswitch(props){
    const {value, label, onChange}  = props
    return (
        <>
        <Switch value={value} labe={label} onChange={(e) => onChange(e.target.checked)} />
        </>
    )
}

export default USswitch