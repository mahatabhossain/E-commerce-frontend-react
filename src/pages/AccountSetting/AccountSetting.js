import React, { useContext, useEffect, useState, useRef } from 'react'
import userContext from '../../context/UserContext'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './accountSetting.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import BasicAlerts from '../../components/Alert/BasicAlerts';
import PopOver from '../../components/PopOver/PopOver';
import helperContext from '../../context/HelperContext';

const Profile = () => {
    const [editedValue, setEditedValue] = useState('');
    const [updatedKey, setUpdatedKey] = useState('');
    const [hoverImage, setHoverImage] = useState(false);
    const profileImageRef = useRef();


    const {
        navigate,
        profileData,
        setProfileData,
        setLoginRes,
        editProfile,
        setEditProfile,
        alertRes,
        setAlertRes,
    } = useContext(userContext);

    const {
        handlePopupClick,
        sendOTP,
        showPopup,
        handlePopupClose
    } = useContext(helperContext)

    const handleEditValue = (e, key) => {
        setEditProfile(prev => ({ ...prev, [e]: true }))
        setEditedValue(profileData[key])
        console.log(e, key)
    }

    const showCameraAvatar = () => {
        setHoverImage(true)
    }

    const hideCameraAvatar = () => {
        setHoverImage(false)
    }
    //UPDATE 
    const onUpdate = async (url, args = null) => {
        const updatedDetails = await axios.put(`${process.env.REACT_APP_ENDPOINT}/${url}/${profileData._id}`, { [updatedKey]: editedValue, otp: args }, { headers: { token: localStorage.getItem('token') } })
        setEditProfile((prev) => ({ ...prev, updateName: false }));
        console.log(updatedDetails)
        if (updatedDetails.status == 200) {

            setAlertRes((prev) => ({ ...prev, showAlert: true, message: updatedDetails.data.status, status: 'success' }));
            handlePopupClose()
            setEditProfile((prev) => ({ ...prev, updateEmail: false }));

        } else {
            setAlertRes((prev) => ({ ...prev, showAlert: false, message: updatedDetails.response.status, status: 'error' }))
        }
        reRenderUpdatedData();
    }

    const reRenderUpdatedData = async () => {
        const user = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/single/user`,
            { headers: { 'token': localStorage.getItem('token'), 'Content-Type': 'application/json' } })
        setProfileData(user.data.user);
        setLoginRes(user)
    }

    const selectProfileImage = () => {
        console.log('Profile click')
        profileImageRef.current.click();
    }
    const handleSelectProfileImage = async (e) => {
        console.log('Path', e.target.files[0])
        const userProfileImage = await axios.post(`${process.env.REACT_APP_ENDPOINT}/upload/profile/image/`, { image: e.target.files[0] }, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
        console.log("profile updated", userProfileImage)
        reRenderUpdatedData()
    }

    useEffect(() => {
        return async () => {
            if (localStorage.getItem('token')) {
                reRenderUpdatedData()
            } else {
                navigate('/login')
            }
        }
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="text-2xl font-medium title-font mb-1 text-gray-900 tracking-widest">Welcome back {profileData.fullName && profileData.fullName.split(' ')[0]}</h1>
                        <p className="font-medium text-gray-600">Become a <Link className='menu_link' to='/vendor/signup'>Seller</Link> </p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 lg:w-1/2">
                            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                <div onMouseOver={showCameraAvatar} onMouseLeave={hideCameraAvatar}>
                                    {!hoverImage ? <img alt="team" className=" hover_icon flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={profileData.avatar} />
                                        :
                                        <img alt="team" onClick={selectProfileImage} className=" hover_image flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src="images/camera.png" />
                                    }
                                </div>
                                <input type='file' ref={profileImageRef} onChange={handleSelectProfileImage} name='image' style={{ display: 'none' }} />
                                <div className="flex-grow sm:pl-8">
                                    {!editProfile.updateName ? <h2 className=" title-font font-medium text-lg text-gray-900">{profileData.fullName} &nbsp; < BorderColorIcon onClick={() => handleEditValue('updateName', 'fullName')} /> </h2>
                                        : <><input name='fullName' className='update_input' type='text' style={{ outline: 'none' }} value={editedValue} onChange={(e) => { setEditedValue(e.target.value); setUpdatedKey(e.target.name) }} /> <CheckIcon onClick={() => { onUpdate('update/user') }} /></>}
                                    {alertRes.showAlert ? <BasicAlerts response={alertRes} /> : ''}

                                    {!editProfile.updateEmail ? <h3 className="text-gray-500 mb-3">{profileData.email} &nbsp; < BorderColorIcon onClick={() => handleEditValue('updateEmail', 'email')} /></h3>
                                        : <><input type='text' name='email' style={{ outline: 'none' }} value={editedValue} onChange={e => { setEditedValue(e.target.value); setUpdatedKey(e.target.name) }} /> <CheckIcon onClick={(e) => { handlePopupClick(e, profileData.email) }} /></>}

                                    <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                                    <span className="inline-flex">
                                        <a className="text-gray-500">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {!showPopup && <PopOver onUpdate={onUpdate} />}
        </div>
    )
}

export default Profile