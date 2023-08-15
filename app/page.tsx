'use client'
import React, { useEffect, useState } from 'react'

function Home() {
  const [data, setData] = useState<any>(null)
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setQuery(e.target.value)
  }
  useEffect(() => {
    fetch(`https://dummyjson.com/users/search?q=${query.length > 1 ? query : ''}`)
      .then(res => res.json())
      .then((data) => {
        if(data.users.length != 0){
          setData(data)
        }else{
          setData(null)
        }
      })
    }, [query])
  return (
    <>
      <div className='flex flex-col gap-4 min-h-screen items-center justify-center pt-20'>
        <input className="input-ghost-primary input" placeholder="Input Type" onChange={e => handleChange(e)}/>
        <div className="flex w-4/6 overflow-x-auto">
          <table className="table-hover table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Birth Date</th>
                <th>University</th>
              </tr>
            </thead>
            <tbody>
              {!data ?
                <tr>
                  <th colSpan={4}>
                    <p className='flex justify-center items-center'>No Data Available</p>
                  </th>
                </tr>
               :
              data.users.map((item:any) => (
                <tr key={item.id}>
                  <th>{item.firstName + ' ' + item.lastName}</th>
                  <td>{item.birthDate}</td>
                  <td>{item.university}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home