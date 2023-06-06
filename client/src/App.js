import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  })
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }
  const handleUpdate = async(e) =>{
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit)
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      window.location.reload();
    }
  }
  const handleEditOnChange = async(e) =>{
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const handleEdit=(el)=>{
    setEditSection(true);
    setFormDataEdit(el);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      window.location.reload();
    }
  }

  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getFetchData()
    }
  }

  return (
    <>
      <div className="container">
        <button className="btn" onClick={() => setAddSection(true)} >Add</button>
      </div>
      {
        addSection && (
          <Form 
          handleSubmit = {handleSubmit}
          handleOnChange = {handleOnChange}
          handleClose ={()=>{
            setAddSection(false);
            setFormData({
              name:"",
              email:"",
              mobile:"",
            })
          }}
          formData={formData}
          />
        )
      }
      {
        editSection && (
          <Form 
          handleSubmit = {handleUpdate}
          handleOnChange = {handleEditOnChange}
          handleClose ={()=>{
            setEditSection(false);
            setFormData({
              name:"",
              email:"",
              mobile:"",
            })
          }}
          formData={formDataEdit}
          />
        )
      }

      <div className="tableContainer">
        {dataList[0] ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Mobile No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((el) => {
                return (
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button className="editBtn" onClick={()=>{handleEdit(el)}} >Edit</button>
                      <button className="deleteBtn" onClick={() => { handleDelete(el._id) }} >Delete</button>
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        ) : (
          <h2>No Data Available</h2>
        )
        }
      </div>
    </>
  );
}

export default App;
