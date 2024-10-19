import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"

export const AdminUsers =()=>{
    const [users, setUsers] = useState([])

    const {authorizationToken} = useAuth()

    const getAllUsersForAdmin= async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/admin/users",{
                method:"GET",
                headers:{
                    'Authorization': authorizationToken
                }
            })

            const data = await response.json()
            // console.log(data);
            setUsers(data)

        } catch (error) {
            console.error(error);
            
        }
    }

    const deleteUser = async(id) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
                method: "DELETE",
                headers:{
                    'Authorization': authorizationToken
                }
            })

            const data = await response.json()
            console.log("response after user deleted ", data);

            if(response.ok){
                toast.success(data.message)
                getAllUsersForAdmin()
            }
            
        } catch (error) {
            console.log("error while deleting user ", error);
            
        }
    }

    useEffect(()=>{
        getAllUsersForAdmin()
    },[])

    return <>
        <section className="admin-users-section">
            <div className="container">
                <h1 className="main-heading">Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table className="table-parent">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((currUser)=>{
                                const {_id, username, phone, email} = currUser
                                return(
                                    <tr key={_id}>
                                        <td>{username}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td><Link to={`/admin/users/${_id}/edit`}>Edit</Link></td>
                                        <td><button onClick={()=> deleteUser(_id)}>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    </>
}