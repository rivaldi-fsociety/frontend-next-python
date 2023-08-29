'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [data, setData] = useState<any>(null)
  const [countData, setCountData] = useState<number>(0)
  const [runtime, setRuntime] = useState<any>(0)
  const [query, setQuery] = useState("")
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setQuery(e.target.value)
      if(e.target.value == ""){
        setIsSearch(false)
        setData(null)
        setCountData(0)
        setRuntime(0)
      }else{
        setIsSearch(true)
      }
  }
  useEffect(() => {
    if(isSearch){
      console.log(query)
      axios.post('http://192.168.200.31:5000/elastic/get-data', {index: 'sales',keyword: query},
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setData(response.data.data)
        setCountData(response.data.count_data)
        setRuntime(response.data.runtime)
        // console.log('data',response.data);
      }, (error) => {
        console.log('error',error);
      });
    }
  }, [isSearch, query])
  return (
    <>
      <div className='flex flex-col gap-4 min-h-screen items-center justify-center pt-20'>
        <div className='flex flex-row space-x-4 justify-center items-center'>
          <div className="form-field">
            <label className="form-label">
              <span className="form-label-alt text-warning">Elastic Search</span>
            </label>
            <input className="input-ghost-primary input" name='keyword' placeholder="Input Type" onChange={e => handleChange(e)}/>
          </div>
          <div className="divider divider-vertical h-20"></div>
          <div className="form-field">
            <label className="form-label">
              <span className="form-label-alt text-warning">Count Data</span>
            </label>
            <input className="input input-solid-success" placeholder="" value={countData} readOnly/>
          </div>
          <div className="divider divider-vertical h-20"></div>
          <div className="form-field">
            <label className="form-label">
              <span className="form-label-alt text-warning">Runtime</span>
            </label>
            <input className="input input-solid-success" placeholder="" value={runtime} readOnly/>
          </div>
        </div>
        <div className="flex w-4/6 overflow-x-auto">
          <table className="table-hover table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Item Type</th>
                <th>Region</th>
                <th>Sales Channel</th>
                <th>Ship Date</th>
              </tr>
            </thead>
            <tbody>
              {!data ?
              <>
                <tr>
                  <th colSpan={5}>
                    <p className='flex justify-center items-center'>No Data Available</p>
                  </th>
                </tr>
              </>
               :
              data.map((item:any) => (
                <tr key={item._id}>
                  <th>{item._source.country}</th>
                  <th>{item._source.item_type}</th>
                  <th>{item._source.region}</th>
                  <th>{item._source.sales_channel}</th>
                  <th>{item._source.ship_date}</th>
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