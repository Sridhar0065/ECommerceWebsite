import React, {  useState,useEffect } from 'react'
import "./UpdateProfile.css"
import Loader from '../layout/loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import {useDispatch} from "react-redux"
import {clearErrors,updateUser,loadUser} from "../../actions/userActions"
import { useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import {useNavigate} from 'react-router-dom';
import Metadata from '../layout/Metadata';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert= useAlert();
  const navigate = useNavigate()

  const {user} = useSelector(state => state.user);
  const {error,isUpdated,loading} = useSelector(state => state.profile);

  const [avatar,setAvatar]=useState("");
  const [avatarPreview,setAvatarPreview] = useState("/Profile.png")
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const updateProfileSubmit = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);
    dispatch(updateUser(myForm))
}

const updateProfileDataChange=(e)=>{
  const reader = new FileReader();
      reader.onload = ()=>{
          if(reader.readyState===2)
          {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
          }
      }
      reader.readAsDataURL(e.target.files[0])
}

    useEffect(() => {
      if(user)
      {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }
        if(isUpdated)
        {
          alert.success("Profile Updated Successfully")
          dispatch(loadUser());
          navigate("/account");
          dispatch({
            type:UPDATE_PROFILE_RESET
          })
        }
        if(error)
        {
            if(error !== "Login to access this resource")
            {
                alert.error(error);
            }
            dispatch(clearErrors())
        }
    }, [dispatch,error,alert,navigate,user,isUpdated])

  return (
    <>
    {loading ? (<Loader/>):(<>
        <Metadata title="Update Profile"/>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className='UpdateProfileHeading'>Update Profile</h2>
                    <form encType='multipart/form-data' className="updateProfileForm" onSubmit = {updateProfileSubmit}>
                        <div className="updateProfileName">
                            <FaceIcon/>
                        <input type="text" placeholder='Name' required value={name} name="name" onChange={(e)=>{setName(e.target.value)}} />
                        </div>
                        <div className="updateProfileEmail">
                        <MailOutlineIcon/>
                        <input type="email" placeholder='Email' required name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                        <div id="updateProfile_img">
                            <img src={avatarPreview} alt="AvatarPreview" />
                            <input type="file" name="avatar" accept="image/" onChange={updateProfileDataChange} />
                        </div>
                        <input type="submit" value="Update" className='updateProfileBtn'/> 
                         {/* disabled={loading?true : false} */}
                    </form>
                </div>
            </div>
            </>)}
    </>
  )
}

export default UpdateProfile