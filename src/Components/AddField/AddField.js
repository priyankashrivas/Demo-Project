import React, { useState } from 'react'
import useValidator from '../Validator/Validator';

export const AddField = () => {
    const [input, setInput] = useState([{ name: "", phone_number: ""}]);
    const [validator, showValidationMessage] = useValidator();

    const handleInputChange = (e, index) => {
       
        const {name, value} = e.target;
        const data = [ ...input]
        data[index][name] = value;
        setInput(data);
    };
    const handleRemoveClick = index => {
        const data = [ ...input];
        data.splice(index, 1);
        setInput(data);
    };

    function addfield(e) {
        e.preventDefault();
        if(validator.allValid()) {
            handleAddClick();
        } else {
            showValidationMessage(true);
        }
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(input)
      }

    function handleAddClick() {
        setInput([...input, {name:'', phone_number: ""}]);
    }
  return (
    <div className="text-center">
         {console.log("valid", validator)}
        <h3 className="text-success">Details of the tenant</h3>
        <p></p>
        <form onSubmit={submit}>
        {input.map((x, i) => {
            return(
                <div>                   
                    <div>name of tenant</div>
                    <input
                    name="name"
                    value={x.name}
                    onChange={e => handleInputChange(e, i)}
                    />
                     {validator.message("name", x.name, "required", { className: "text-danger", })}
                    <p></p>
                    <div>phone_number</div>
                    <input
                    name="phone_number"
                    value={x.phone_number}
                    onChange={e => handleInputChange(e, i)}
                    />
                    {validator.message("phone_number", x.phone_number, "required|numeric|min:10", { className: "text-danger", })}
                    <div>
                    <p></p>
                        {i !== 0 && <button onClick={() => handleRemoveClick(i)} className="me-3">Delete</button>}
                        {input.length - 1 === i && <button onClick={addfield}>Add</button>}
                    </div>
                    
                </div>               
            );
        })}
        </form>
        {console.log("hello",input)}
        <p></p>
        <button onClick={submit}>Submit</button>
    </div>
  )
}
export default AddField;
