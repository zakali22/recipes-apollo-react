import React from 'react'

export default function Error({errors}) {
    return (
        <div>
            {errors.map((err, index) => (
                <p key={index} style={{color: 'red'}}>{err.message}</p>
            ))}
        </div>
    )
}
