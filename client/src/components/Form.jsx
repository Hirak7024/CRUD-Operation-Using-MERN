import React from 'react'
import '../App.css'

export default function Form({handleSubmit,handleOnChange,handleClose,formData}) {
  return (
    <>
    <div className="addMainConatiner">
            <div className="addContainer">
              <button className="btn3" onClick={handleClose}>X</button>
              <form onSubmit={handleSubmit} >
                <div className="labelAndInput">
                  <label htmlFor="name">Name : </label>
                  <input type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete='off'
                    value={formData.name}
                    onChange={handleOnChange} />
                </div>
                <div className="labelAndInput">
                  <label htmlFor="email">Email : </label>
                  <input type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete='off'
                    value={formData.email}
                    onChange={handleOnChange} />
                </div>
                <div className="labelAndInput">
                  <label htmlFor="mobile">Mobile No : </label>
                  <input type="text"
                    id="mobile"
                    name="mobile"
                    maxLength={10}
                    required
                    autoComplete='off'
                    value={formData.mobile}
                    onChange={handleOnChange} />
                </div>
                <button className="btn2" type="submit">Submit</button>
              </form>
            </div>
          </div>
    </>
  )
}
