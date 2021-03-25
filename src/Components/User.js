import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching user&apos;s details...</h3>
  }

  return (
    <section className='user-container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>House: {details.house}</p>
      <p>Role: {details.role}</p>
      {
        !!details.focus && !!details.focus.length &&
        <div>
          Area(s) of Focus:
          <ul>
            {details.focus.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
    </section>
  )
}

export default User
