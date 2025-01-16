"use client"
import { useRouter } from 'next/navigation';
import React from 'react';


const MenuBar = ({ pages }) => {
    const router = useRouter()
    return (
        <menu className={"flex flex-col shadow-gray-600 shadow-md rounded-lg px-8 py-8 w-64 h-svh gap-3"}>
            <div className='p-3 text-center text-2xl font-mono border-b-2 border-black'>SECatalog <span className='text-xs'>Admin</span></div>
            <nav className='flex flex-col py-6 px-2 gap-1'>
                {
                    pages.map((page, key) => {
                        return (
                            <div
                                key={key}
                                onClick={() => { router.push(page.route) }}
                                className="cursor-pointer font-mono transition-all shadow-sm hover:shadow-gray-300 rounded-md py-2 px-4"
                            >
                                {page.title}
                            </div>
                        )
                    })
                }

            </nav>
        </menu>
    );
}

export default MenuBar;
