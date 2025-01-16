"use client"
import { getData } from '@/actions/getUsers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [users, setUsers] = useState([])
    const [list, setList] = useState(2)
    const router = useRouter()
    useEffect(() => {
        const data = getData()
        data.then((data) => {
            setUsers(data.filter((user) => user.role == list))
        })
    }, [list])

    return (
        <div className='shadow-gray-400 shadow-md h-svh overflow-x-hidden overflow-y-scroll p-4 '>
            {/* Tabs */}
            <div>
                <div className='flex gap-4 justify-center h-11 w-2/5 m-2 font-mono'>
                    <button onClick={() => { setList(2) }} className={`w-1/3 h-full shadow-lg shadow-gray-300 rounded-lg hover:shadow-gray-500 transition-all ${list == 2 ? "border-2 border-blue-500" : ""}`}>Profesori</button>
                    <button onClick={() => { setList(3) }} className={`w-1/3 h-full shadow-lg shadow-gray-300 rounded-lg hover:shadow-gray-500 transition-all ${list == 3 ? "border-2 border-blue-500" : ""}`}>Studenti</button>
                </div>
                {/* Table */}
                <div className='flex flex-row gap-4 mb-4 w-full border-2 border-gray-300 rounded-lg'>
                    <div className='p-2'>Nr</div>
                    <div className='w-1/5 p-2'>Prenume</div>
                    <div className='w-1/5 p-2'>Nume</div>
                    <div className='w-1/5 p-2'>Telefon</div>
                    <div className='w-1/5 p-2'>Rol</div>
                    {
                        <div className='w-1/5 p-2'>
                            {list == 3 ? "Group_id" : list == 2 ? "Object_id" : ""}
                        </div>
                    }
                </div>
            </div>

            {/* Users */}
            {
                users.map((user, index) => {
                    return (
                        <div key={index} className='flex flex-row gap-4 w-full border-2 mb-2 border-gray-300 rounded-lg'>
                            <div className='p-3'>{(index + 1)}</div>
                            <div className='w-1/5 p-2 py-3'> {user.first_name}</div>
                            <div className='w-1/5 p-2 py-3'>{user.lastName}</div>
                            <div className='w-1/5 p-2 py-3'>{user.phone}</div>
                            <div className='w-1/5 p-2 py-3'>{user.role}</div>
                            {
                                <div className='w-1/5 p-2 py-3'>
                                    {list == 3 ? user.group_id : list == 2 ? user.object_id : ""}
                                </div>
                            }
                        </div>
                    )
                })
            }
            <button
                onClick={() => router.push('/addUser')}
                className='mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all'
            >Utilizator nou</button>

        </div >
    );
}


export default Page;
