import React from 'react'
import { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        first

        return () => {
            second
        }
    }, [third])

    
  return (
    <div>Test</div>
  )
}

export default Test