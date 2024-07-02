import React, { useState } from 'react'

import './Box.css'

function Box(props) {
  const [formData, setFormData] = useState({ grpName: ' ', color: ' ' })
  const setGroups = props.setGroups
  const groups = props.groups
  const color = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ]

  const handleChange = (e) =>{
    e.preventDefault()
    setFormData({...formData,
      [e.target.name] : e.target.value
  })
  console.log(formData.grpName)
  }

  const handleColorChange= (e) =>{
    e.preventDefault()
    setFormData({...formData,
      [e.target.name]: e.target.getAttribute('color'),
    })
    console.log(formData.color)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!formData.color){
      alert('Please select a color')
      return;
    }
    let newGroup = {
      groupName: formData.grpName,
      color: formData.color,
      notes: [],
      id: groups.length,
    }
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    props.closeBox(false);

  }

  return (
    <div className='BoxBackground'>
      <div className='BoxContainer'>
      <span>
      <button className='closeButton' onClick={() => props.closeBox(false)}>X</button>
      </span>
        <h2 className='Boxheading'>Create new Group</h2>
        <label className='groupN'>Group Name :</label>
        <input
          type="text"
          className="note-heading"
          name="grpName"
          placeholder="Enter your group name"
          onChange={handleChange}
        />
        <label className='color'>Choose Color</label>
        
          {color.map((color, index) => (
            <button
              key={index}
              color={color}
              name="color"
              className={`colorButton ${formData.color === color ? 'selected' : ''}`}
              style={{
                height: '40px',
                width: '40px',
                background: color,
                borderRadius: '25px',
                border: 'none',
                marginRight: '10px',
              }}
              onClick={handleColorChange}
            />
          ))}
      
        <button className='create'  onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  )
}

export default Box
