import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
      email : "",
      name : "",
      role : "",
      _id : ""
    })

    const fetchAllUsers = async() => {
        const fetchData = await fetch(SummaryApi.all_users.url, {
            method : SummaryApi.all_users.method,
            credentials : 'include',
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success) {
          setAllUsers(dataResponse.data)
        }

        if(dataResponse.error) {
          toast.error(dataResponse.message)
        }

        console.log(dataResponse)
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>S/N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-100 p-1 rounded-full cursor-pointer hover:bg-green-300' 
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
            onClose={() => setOpenUpdateRole(false)} 
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }

      
    </div>
  )
}

export default AllUsers