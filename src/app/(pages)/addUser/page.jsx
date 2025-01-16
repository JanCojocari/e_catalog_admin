"use client"
import { getGroups } from "@/actions/getGroups";
import Input from "@/app/Components/Input/Input";
import { useEffect, useState } from "react";



const Page = () => {
    const tabButtonStyle = 'text-center w-1/2 h-full p-2 px-4 shadow-lg shadow-gray-300 rounded-lg hover:shadow-gray-500 transition-all'
    const [role, setRole] = useState(2);
    const [groups, setGroups] = useState([]);
    const [year, setYear] = useState("")

    useEffect(() => {
        try {
            const groups = getGroups();
            groups.then((data) => {
                setGroups(data)
                console.log(data)
            })
        } catch (e) {
            console.log("Failed to get data! Error:" + e)
        }

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submit');
    }



    return (
        <div className='shadow-gray-400 shadow-md h-svh overflow-x-hidden flex justify-center items-center'>
            <div className="shadow-gray-400 shadow-md w-1/2 h-3/5">
                <div className="flex gap-5 p-5 font-mono text-xl">
                    <button onClick={() => { setRole(2) }} className={`${tabButtonStyle} ${role == 2 && "bg-gray-400 text-white border-2 border-blue-500"} `}>Profesor</button>
                    <button onClick={() => { setRole(3) }} className={`${tabButtonStyle} ${role == 3 && "bg-gray-400 text-white border-2 border-blue-500"} `}>Student</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2 m-auto'>
                    {/* LastName */}
                    <Input type="text" placeholder="Nume" />
                    {/* FirstName*/}
                    <Input type="text" placeholder="Prenume" />
                    {/* Phone */}
                    <Input type="text" placeholder="Telefon" />
                    {/* Year*/}
                    {
                        role == 3 && <Input
                            type="text"
                            placeholder="An"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    }
                    {/* Group_id*/}
                    {
                        <select >{
                            role == 3 ?
                                groups.filter((group => group.group_year == year)).map(({ group_id, group_name }, key) => {
                                    return (
                                        <option key={key} value={group_id}>{group_name}</option>
                                    )
                                }) : role == 2 &&

                                groups.map((group, key) => {
                                    return (
                                        <option key={key} value="">Object name</option>
                                    )
                                })
                        }
                        </select>
                    }

                    <Input type="password" placeholder={"Parola"} />
                </form>
            </div>
        </div>
    );
}

export default Page;
