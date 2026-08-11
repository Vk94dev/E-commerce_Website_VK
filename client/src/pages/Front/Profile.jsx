import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import {updateProfile } from "../../api/api";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();


    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [address, setAddress] = useState(user?.address || "");
    const [image,setImage] = useState(null);

const handleImageChange=(e)=>{

    const file=e.target.files[0];
    if(file){
        setImage(file);
  }};

const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name",name);
            formData.append("phone",phone);
            formData.append("address",address);
            if(image){
                formData.append("profileImage",image);
            }
            
           const data = await updateProfile(formData);
        //    console.log("data =",data);
            dispatch(updateUser(data.user));


            alert("Profile Updated");

        } catch (err) {

            console.log(err);

        }
    };

return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-10">
            
            <div className="max-w-4xl mx-auto bg-[var(--card)] rounded-2xl shadow-lg p-5 ">
            
            <div className="flex flex-row justify-end items-center pt-2 text-xl pr-4">
                <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200  px-4 py-1.5 text-blue-700 rounded-md  ">
                            Back
                        </button>
             </div>
             
                <form  onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10 ">

                    {/* Left Side */}

                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="relative">
                            <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={handleImageChange} />
                            <label  htmlFor="profileImage" className="cursor-pointer">
                        {
                            user?.profileImage ?

                               ( <img
                                    src={user?.profileImage}
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                                />)

                                :

                               ( <FaUserCircle
                                    size={150}
                                    className="text-gray-400"
                                />)

                        }
                            </label>
                       </div>

                        <h2 className="text-2xl font-bold mt-4">
                            {user.name.charAt(0).toUpperCase()+user.name.slice(1).toLowerCase()}
                        </h2>

                        <p className="text-[var(--secondary)]">
                            {user?.email}
                        </p>

                        <span className="mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded-full">

                            {user?.role}

                        </span>
                    

                    </div>

                    {/* Right Side */}

                    <div className="flex-1  w-70%">

                        <h2 className="text-3xl font-bold mb-6">

                            My Profile

                        </h2>
                       

                        <div
                           
                            className="space-y-5"
                        >

                            <div>

                                <label>Name</label>

                                <input
                                    className="w-full rounded-lg p-3 mt-1 bg-[var(--bg)] outline-none"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            </div>

                            <div>

                                <label>Email</label>

                                <input
                                    disabled
                                    className="w-full rounded-lg p-3 mt-1 bg-[var(--bg)] outline-none"
                                    value={user?.email}
                                />

                            </div>

                            <div>

                                <label>Phone</label>

                                <input
                                    className="w-full bg-[var(--bg)] outline-none rounded-lg p-3 mt-1"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                />

                            </div>

                            <div>

                                <label>Address</label>

                                <textarea
                                    rows="4"
                                    className="w-full bg-[var(--bg)] outline-none rounded-lg p-3 mt-1"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)
                                    }
                                />

                            </div>

                            <button type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Update Profile
                            </button>

                        </div>

                    </div>

                </form>
        
            </div>

        </div>

    );

};

export default Profile;