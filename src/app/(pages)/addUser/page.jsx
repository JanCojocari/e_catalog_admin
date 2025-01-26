"use client"
import { addUser } from "@/actions/addUser";
import { getGroups } from "@/actions/getGroups";
import { getObjects } from "@/actions/getObjects";
import Input from "@/app/Components/Input/Input";
import { useEffect, useState } from "react";



const Page = () => {
    const tabButtonStyle = 'text-center w-1/2 h-full p-2 px-4 shadow-lg shadow-gray-300 rounded-lg hover:shadow-gray-500 transition-all'

    const [groups, setGroups] = useState([]);
    const [objects, setObjects] = useState([]);

    const [role, setRole] = useState(2);
    const [year, setYear] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [group, setGroup] = useState("")
    const [object, setObject] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        try {
            const groups = getGroups();
            groups.then((data) => {
                setGroups(data)
            })

            const objects = getObjects();
            objects.then((data) => {
                setObjects(data)
            })

        } catch (e) {
            console.log("Failed to get data! Error:" + e)
        }

    }, [])

    useEffect(() => {
        setYear("")
        setPassword("")
        setGroup("")
        setObject("")
    }, [role])

    const resetFields = () => {
        setFirstname("")
        setLastname("")
        setPhone("")
        setPassword("")
        setGroup("")
        setObject("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "role": role,
            "group": group,
            "object": object,
            "password": password
        }

        if ((role == 2 && object) || (role == 3 && group)) {
            try {
                addUser(data)
                resetFields()
                setMessage("Utilizator adaugat cu succes!")
                setTimeout(() => {
                    setMessage("")
                }, 2000)

            } catch (e) {
                console.log("Failed to add user! Error:" + e)
                return
            }
        } else {
            alert("Completati toate campurile!")
        }


    }

    return (
        <div className='shadow-gray-400 shadow-md h-svh overflow-x-hidden flex justify-center items-center'>
            <div className="shadow-gray-400 shadow-md w-1/2 transition-all pb-7">
                <div className="flex gap-5 p-5 font-mono text-xl">
                    <button onClick={() => { setRole(2) }} className={`${tabButtonStyle} ${role == 2 && "bg-gray-400 text-white border-2 border-blue-500"} `}>Profesor</button>
                    <button onClick={() => { setRole(3) }} className={`${tabButtonStyle} ${role == 3 && "bg-gray-400 text-white border-2 border-blue-500"} `}>Student</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2 m-auto'>
                    {/* FirstName*/}
                    <Input required={true} type="text" placeholder="Nume" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    {/* LastName */}
                    <Input required={true} type="text" placeholder="Prenume" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    {/* Phone */}
                    <Input required={true} type="text" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {/* Year*/}
                    {
                        role == 3 && <Input
                            type="text"
                            placeholder="An"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required={true}
                        />
                    }
                    {/* Group_id*/}
                    {
                        year &&
                        <select name="group_id" id="group_id" className="p-2 rounded-lg border-2 border-gray-300"
                            onChange={(e) => setGroup(e.target.value)}
                            required={true}
                        >
                            <option>Alege Grupa</option>
                            {
                                role == 3 &&
                                groups.filter((group => group.group_year == year)).map(({ group_id, group_name }, key) => {
                                    return (
                                        <option key={key} value={group_id}>{group_name}</option>
                                    )
                                })
                            }
                        </select>
                    }

                    {role == 2 &&
                        <select name="object_id" id="object_id" className="p-2 rounded-lg border-2 overflow-scroll border-gray-300"
                            onChange={(e) => setObject(e.target.value)}
                            required={true}
                        >
                            <option>Alege Obiectul</option>
                            {
                                objects.map(({ object_id, object_name, object_short_name }, key) => {
                                    return (
                                        <option className="w-fit" key={key} value={object_id}>{object_name}({object_short_name})</option>
                                    )
                                })
                            }
                        </select>

                    }
                    <Input required={true} type="password" placeholder={"Parola"} value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all">Adauga</button>
                    {message && <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded">{message}</div>}
                </form>
            </div>
        </div>
    );
}

export default Page;
