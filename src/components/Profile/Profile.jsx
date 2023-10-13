import React, { useContext, useEffect, useState } from 'react'
import style from './Profile.module.css'
import avat from '../../images/avatar.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'
import jwtDecode from 'jwt-decode'
import { useQuery } from 'react-query'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export default function Profile() {
  // let{token} = useContext(tokenContext)
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userId, setuserId] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { data, error, isLoading } = useQuery('data', getMessages);


  
  useEffect(() => {
   // getMessages()
    getUserId()
  }, [])

  async function getMessages() {
    let response = await axios.get("https://sara7aiti.onrender.com/api/v1/message", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });

     return response.data.allMessages;
    //console.log(data)
    //setAllMessages(data.allMessages)
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  function getUserId() {
    let decoded = jwtDecode(localStorage.getItem("userToken"))
    console.log(decoded)
    setuserId(decoded.id)
  }



 
  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card pt-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src={avat} className="avatar " alt="" />
            </a>
            <h3 className="py-2">Mohab Ashraf</h3>
        


            <div>
      <Button className='mb-2' variant="primary" onClick={handleShow}>
      Share Profile by Popup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share User Id</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{`http://localhost:3000/message/${userId}`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* You can add more buttons here */}
        </Modal.Footer>
      </Modal>
    </div>






            <Link data-toggle="modal" to={'/message/' + userId} className="btn btn-default-outline share "><i className="fa fa-share-alt" />  Share Profile</Link>
          </div>
        </div>
        {/* profile photo Modal */}
        <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Change photo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form action method="post">
                    <label htmlFor className="text-muted">The file size of the photo should not exceed 7 MB</label>
                    <input className="form-control" type="file" name="photo" id />
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-info">Upload</button>
                <button type="button" className="btn btn-outline-danger">Remove Photo</button>
              </div>
            </div>
          </div>
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
        {/* /modal */}
        {/* =================messages=================== */}

        <div className="container text-center my-5 text-center">
          <div className="row">
            {data.length == 0 ? <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div> : ""}

            {data.map((ele) => <div key={ele._id} className="col-md-12 mb-5">
              <div className="card py-5">
                <p>{ele.messageContent} </p>
              </div>
            </div>)}

          </div>
        </div>


      </div>

    </>
  )
}

