import React, {  useState,useEffect } from 'react'
import "./resetPassword.css"
import Loader from '../layout/loader/Loader'
import {useDispatch} from "react-redux"
import {clearErrors,resetPassword} from "../../actions/userActions"
import { useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import {useNavigate} from 'react-router-dom';
import Metadata from '../layout/Metadata';
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert= useAlert();
    const navigate = useNavigate();
    const params = useParams();
  
    const {error,success,loading} = useSelector(state => state.forgotPassword);

      const [newPassword,setNewPassword] =useState("");
      const [confirmPassword,setConfirmPassword] =useState("");
  
    const resetPasswordSubmit = (e)=>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("newPassword",newPassword);
      myForm.set("confirmPassword",confirmPassword);
      dispatch(resetPassword(params.token,myForm))
  }
  
      useEffect(() => {
          if(error)
          {
              if(error !== "Login to access this resource")
              {
                  alert.error(error);
              }
              dispatch(clearErrors())
          }
          if(success)
          {
            alert.success("Password Changed Successfully")
            navigate("/login");
          }
        }, [dispatch,error,alert,navigate,success])
    return (
      <>
      {loading ? (<Loader/>):(<>
          <Metadata title="Reset Password"/>
              <div className="resetPasswordContainer">
                  <div className="resetPasswordBox">
                    <h2 className='resetPasswordHeading'>Reset Password</h2>
                      <form className="resetPasswordForm" onSubmit = {resetPasswordSubmit}>
                          <div className="newPassword">
                              <LockOpenIcon/>
                              <input type="password" placeholder='New Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                          </div>
                          <div className="confirmPassword">
                              <LockIcon/>
                              <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                          </div>
                          
                          <input type="submit" value="Reset" className='resetPasswordBtn'/> 
                           {/* disabled={loading?true : false} */}
                      </form>
                  </div>
              </div>
              </>)}
      </>
    )
}

export default ResetPassword