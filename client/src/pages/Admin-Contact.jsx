import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { toast } from "react-toastify"

export const AdminContact =()=>{
    const [contact, setContact] = useState([])

    const {authorizationToken} = useAuth()


    const getAllContactForAdmin = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts",{
                method: "GET",
                headers:{
                    'Authorization' : authorizationToken
                }
            })

            const data = await response.json()
            console.log("after fetching contact data ", data);

            if(response.ok){
                setContact(data)
            }
            

        } catch (error) {
            console.error("error fetching contact data in admin :",error);
            
        }
    }

    const deleteContactData = async(id) =>{
        try {
            console.log(id);
            
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method: "DELETE",
                headers:{
                    'Authorization': authorizationToken
                }
            })

            const data = await response.json()
            console.log("response after user deleted ", data);

            if(response.ok){
                toast.success(data.message)
                getAllContactForAdmin()
            }else{
                toast.error("Can't Delete Contact")
            }
            
        } catch (error) {
            console.log("error while deleting contact", error);
            
        }
    }

    useEffect(()=>{
        getAllContactForAdmin()
    },[])

    return <>
        <section className="admin-contacts-section">
            <div className="container">
                <h1 className="main-heading">Contact Data</h1>
            </div>
            <div className="container admin-users contact-div">
                {
                    contact.map((currContact)=>{
                        const { _id, username, email, message} = currContact
                        {/* console.log(_id) */}
                        return(
                            <div className="contact-box" key={_id}>
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{message}</p>
                                <button className="btn" onClick={()=> deleteContactData(_id)}>delete</button>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    </>
}