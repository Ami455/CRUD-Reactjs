import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function App() {

  let [inputData, setInputData] = useState({

    name: "",
    payed: "",
    remain: "",
    phoneNumber: "",
    diploma: "",

  })
  function changeInputData(e) {
    let newInputData=inputData
    newInputData[e.target.name] = e.target.value
    setInputData(newInputData)
  }

  let [apiData, setApiData] = useState([])

  function submitData(e) {
    e.preventDefault()
    sendApiData()
    clearFormInput()
    
  }

  async function sendApiData() {
    await axios.post("https://67f1842bc733555e24ad6d35.mockapi.io/front", inputData)
    getDataApi()
  }
  function clearFormInput() {
    document.getElementById("form").reset()
  }


  async function getDataApi() {
    let { data } = await axios.get("https://67f1842bc733555e24ad6d35.mockapi.io/front")
    setApiData(data)
  //  console.log(data)
  //   console.log(apiData)
  }

  useEffect(() => {
    getDataApi()
    console.log(apiData)
  }, [])

 async function deleteItem(id) {
   await axios.delete(`https://67f1842bc733555e24ad6d35.mockapi.io/front/${id}`)
    getDataApi()
  }
let updateData={
  name: "fff",
    payed: "",
    remain: "",
    phoneNumber: "",
    diploma: "",
}
 function editItem(id) {
  
  updateItem(id)
  
}
  async function updateItem(id) {
    await axios.put(`https://67f1842bc733555e24ad6d35.mockapi.io/front/${id}`,updateData)
    getDataApi()
  }


  return (
    <>
      <div className='container  p-5'>
        <h1 className='text-success text-center fw-bolder m-0'>التسجيل في الدبلومة</h1>
        <form id="form">
          <input type="text" onChange={changeInputData} className="form-control my-3" placeholder="اسم المتدرب" id="name" name="name" />
          <input type="text" onChange={changeInputData} className="form-control my-3" placeholder="المبلغ المحجوز" id="payed" name="payed" />
          <input type="text" onChange={changeInputData} className="form-control my-3" placeholder="المبلغ المتبقي" id="remain" name="remain" />
          <input type="text" onChange={changeInputData} className="form-control my-3" placeholder="رقم الهاتف" id="phoneNumber" name="phoneNumber" />
          <input type="text" onChange={changeInputData} className="form-control my-3" placeholder="اسم الدبلومة" id="diploma" name="diploma" />

          <button onClick={submitData} type="submit" className="btn btn-outline-primary ">تسجيل الطالب</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Payed</th>
              <th scope="col">Remain</th>
              <th scope="col">PhoneNumber</th>
              <th scope="col">Diploma</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>

            </tr>
          </thead>
          <tbody>

            {apiData.map((x) => <tr key={x.id}>
              <th scope="row" >{x.id}</th>
              <td>{x.name}</td>
              <td>{x.payed}</td>
              <td>{x.remain}</td>
              <td>{x.phoneNumber}</td>
              <td>{x.diploma}</td>
              <td><button onClick={() => deleteItem(x.id)} className='btn btn-outline-danger'>مسح</button></td>
              <td><button onClick={() => editItem(x.id)} className='btn btn-outline-warning'>تعديل</button></td>
            </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

