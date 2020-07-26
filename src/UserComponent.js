import React, { useState, useEffect } from 'react'

export default function UserComponent({inputNodes,dividedDigits}) {

    // array to hold values of respective input nodes
    const [inputValue, setInputValue] = useState([])

    // reference to input nodes
    const inputrefs = []

    useEffect(() => {
        let x = []
        for (let i = 0; i < inputNodes; i++) {
            x.push('')
            inputrefs.push(`inputRef${i}`)
        }
        setInputValue(x)
    }, [])

    useEffect(() => {
        console.log('inputValue', inputValue)
    }, [inputValue])

    const changeHandler = (e) => {
        let value = e.target.value
        let id = e.target.id;
        console.log('id',id)
        // for input greater than specified number of divided-digit-length
        if (value.length > dividedDigits) {
            console.log('if')
            if (value.length<=(dividedDigits*inputNodes)) {
                let arr = stringCut(value, dividedDigits)

                let copyOfInputValue = inputValue

                arr.forEach((e, i) => {
                    copyOfInputValue.splice(i, 1, e)
                })
                setInputValue([...copyOfInputValue])
                inputrefs[inputNodes-1].focus()
            }
            else{
                alert('Not a valid number')
            }
        }
        // for input less or equal to specified number of divided-digit-length
        else {
            let copyOfInputValue = inputValue;
            if (value.length === dividedDigits) {
                if (id < inputNodes - 1) {
                    console.log('id', id)
                    let tempid = Number(id) + 1
                    inputrefs[tempid].focus();
                }
                else {
                    console.log('inputrefs[id]',id,dividedDigits)
                    inputrefs[id].maxLength = dividedDigits
                }

            }
            console.log('else')
            copyOfInputValue[id] = value
            setInputValue([...copyOfInputValue])
        }
    }

    //for keyboard acceaccessibility
    const keyUpHandler = (e) =>{
        let id = e.target.id
        if(e.keyCode===37){
            if(id>0){
                inputrefs[id-1].focus()
            }
        }
        else if(e.keyCode===39){
            if(id<dividedDigits-1){
                inputrefs[Number(id)+1].focus()
            }
        }
        // keyboard deletion/backspace handler
        else if(e.keyCode===8){
            console.log('value',inputrefs[id].value)
            if(inputrefs[id].value.length===0 && id>0){
                inputrefs[id-1].focus()
            }
        }
    }

    // Function to chop and distribute values for input greater than divied-digit-length
    const stringCut = (str, len) => {
        let out = []
        for (let i = 0; i < str.length; i = i + len) {
            let newStr = str.slice(i, i + len)
            out.push(newStr)
        }
        return out
    }


    return (
        <div>
            <div className='container'>
                <div className='card-text'>Card Number</div>
                <div className='d-flex'>
                    {inputValue && inputValue.map((e, i) =>
                        <input type='text' 
                        key={i} 
                        id={i} 
                        ref={(input) => { inputrefs[i] = input }} 
                        onChange={changeHandler} 
                        onKeyUp={keyUpHandler}
                        value={e} />
                    )}
                </div>
            </div>
        </div>
    )
}
