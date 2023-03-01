import React from 'react'

const InputField = (props) => {
    return (
        <div>
            <input  autocomplete={props.autocomplete} className={props.className} name={props.name} id={props.id} placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default InputField
