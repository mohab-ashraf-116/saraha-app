import React from 'react'
import style from './SendMessage.module.css'
import avat from '../../images/avatar.png'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
export default function SendMessage() {

  let x = useParams()

  async function addMesaage(values){
    let data ={
      ...values,
      receivedId : x.userId
    }
    let res = await axios.post("https://sara7aiti.onrender.com/api/v1/message",data)
    console.log(res)
  }

  let formik = useFormik({
    initialValues:{
      messageContent:""
    },
    onSubmit:(values)=>{
      addMesaage(values)
    }
  })

  return (
    <>
     <div>
  <div className="container text-center py-5 my-5 text-center">
    <div className="card py-5 mb-5">
      <a href data-toggle="modal" data-target="#profile">
        <img src={avat} className="avatar " alt="" />
      </a>
  
      <div className="container w-50 m-auto">
        <form onSubmit={formik.handleSubmit}>
          <textarea className="form-control" name="messageContent" value={formik.values.messageContent} onChange={formik.handleChange} id cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
          <button type='submit' className="btn btn-outline-info mt-3"><i className="fa fa-paper-plane" /> Send</button>
        </form>
      </div>
    </div>
    <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fa fa-share-alt" />  Share Profile</button>
  </div>
  {/*  Share profile Modal */}
  <div className="modal fade" id="share" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Share Profile</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>host/messages/id</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
