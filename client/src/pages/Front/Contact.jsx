import React, { useState } from "react";
import {Mail,Phone, MapPin, Clock} from "lucide-react";
import { contactToAdmin } from "../../api/api";

const Contact = ()=> {

    const [contact,setContact] = useState({
        name:"", email:"",subject:"",message:""
    })

    const ChangeHandler = (e)=>{
        // setContact({
        //     ...contact,
        //     [e.target.name]:e.target.value
        // })

         const { name, value } = e.target;

    setContact((prev) => ({
        ...prev,
        [name]: value,
    }));
    }

    const submitHandler = async (e)=>{
       e.preventDefault();
       try{
        console.log("contact = ",contact);
            const res = await contactToAdmin(contact);
        console.log("res = ",res);
          setContact({
            name:"",email:"",subject:"",message:""
          })
       }
       catch(err){
        console.log(err.message);
       }
    }

    return (

        <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen">

            {/* Hero */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl font-bold">
                        Contact Us
                    </h1>

                    <p className="mt-4 text-lg text-gray-200">

                        We'd love to hear from you.
                        Send us your questions or feedback.

                    </p>

                </div>

            </div>

            {/* Main Section */}

            <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 ">

                {/* Left */}

                <div>

                    <h2 className="text-3xl font-bold mb-8">
                        Get In Touch
                    </h2>

                    <div className="space-y-6  ">

                        <div className="flex items-center gap-5 p-5 rounded-xl border border-[var(--border)] shadow text-[var(--text)] bg-[var(--card)]">

                            <Phone className="text-blue-600" size={28} />

                            <div>

                                <h3 className="font-semibold">
                                    Phone
                                </h3>

                                <p className="text-gray-500">
                                    {import.meta.env.VITE_PHONE_NO}
                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-5 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-5 rounded-xl shadow">

                            <Mail className="text-blue-600" size={28} />

                            <div>

                                <h3 className="font-semibold">
                                    Email
                                </h3>

                                <p className="text-gray-500">
                                    {import.meta.env.VITE_CONTACT_EMAIL}
                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-5 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-5 rounded-xl shadow">

                            <MapPin className="text-blue-600" size={28} />

                            <div>

                                <h3 className="font-semibold">
                                    Address
                                </h3>

                                <p className="text-gray-500">
                                    {import.meta.env.VITE_OFFICE_ADDRESS}

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-5 border border-[var(--border)] text-[var(--text)] bg-[var(--card)] p-5 rounded-xl shadow">

                            <Clock className="text-blue-600" size={28} />

                            <div>

                                <h3 className="font-semibold">

                                    Working Hours

                                </h3>

                                <p className="text-gray-500">

                                   {import.meta.env.VITE_DAYS_NAME}
                                    <br />

                                  {import.meta.env.VITE_TIME_DURATION}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Contact Form */}

                <div className="bg-[var(--card)] text-[var(--text)] rounded-2xl border border-[var(--border)] shadow-lg p-8">

                    <h2 className="text-3xl font-bold mb-8">

                        Send Message

                    </h2>

                    <form onSubmit={submitHandler} className="space-y-5">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={contact.name}
                            className="w-full border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--bg)]"
                            onChange={ChangeHandler}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={contact.email}
                            className="w-full border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--bg)]"
                            onChange={ChangeHandler}
                        />

                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={contact.subject}
                            onChange={ChangeHandler}
                            className="w-full border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--bg)]"
                        />

                        <textarea
                            rows="6"
                            name="message"
                            placeholder="Write your message..."
                            value={contact.message}
                            onChange={ChangeHandler}
                            className="w-full border border-[var(--border)] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--bg)]"
                        ></textarea>

                        <button type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition  border border-[var(--border)] "
                        >

                            Send Message

                        </button>

                    </form>

                </div>

            </div>

            {/* Google Map */}

            <div className="max-w-7xl mx-auto px-6 pb-16 border border-[var(--border)]">

                <div className="rounded-xl overflow-hidden shadow-lg">

                    <iframe
                        title="location"
                        src="https://www.google.com/maps?q=Surat&output=embed"
                        width="100%"
                        height="400"
                        loading="lazy"
                    ></iframe>

                </div>

            </div>

        </div>

    );

}


export default Contact;










