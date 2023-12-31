import React, {  useState,useEffect } from 'react'
import "./updatePassword.css"
import Loader from '../layout/loader/Loader'
import {useDispatch} from "react-redux"
import {clearErrors,updatePassword} from "../../actions/userActions"
import { useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import {useNavigate} from 'react-router-dom';
import Metadata from '../layout/Metadata';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"

const UpdatePassword = () => {
    const dispatch = useDispatch();
  const alert= useAlert();
  const navigate = useNavigate()

  const {error,isUpdated,loading} = useSelector(state => state.profile);

    const [oldPassword,setOldPassword] =useState("");
    const [newPassword,setNewPassword] =useState("");
    const [confirmPassword,setConfirmPassword] =useState("");

  const updatePasswordSubmit = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword",oldPassword);
    myForm.set("newPassword",newPassword);
    myForm.set("confirmPassword",confirmPassword);
    dispatch(updatePassword(myForm))
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
        if(isUpdated)
        {
          alert.success("Password Changed Successfully")
          navigate("/account");
          dispatch({
            type:UPDATE_PASSWORD_RESET
          })
        }
      }, [dispatch,error,alert,navigate,isUpdated])
  return (
    <>
    {loading ? (<Loader/>):(<>
        <Metadata title="Change Password"/>
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                  <h2 className='updatePasswordHeading'>Change Password</h2>
                    <form className="updatePasswordForm" onSubmit = {updatePasswordSubmit}>
                    <div className="oldPassword">
                            <VpnKeyIcon/>
                            <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        </div>
                        <div className="newPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='New Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div className="confirmPassword">
                            <LockIcon/>
                            <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        
                        <input type="submit" value="Change" className='updatePasswordBtn'/> 
                         {/* disabled={loading?true : false} */}
                    </form>
                </div>
            </div>
            </>)}
    </>
  )
}

export default UpdatePassword