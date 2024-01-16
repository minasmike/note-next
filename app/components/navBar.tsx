import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const NavBar = () => {
    return (
        <div className="navbar bg-red-100 pb-4">
            <div className="navbar-start flex">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                        <li><a>Dashboard</a></li>
                        <li>
                            <a href='../note/create'>Create Note</a>
                        </li>
                        <li><a>Settings</a></li>
                    </ul>
                </div>
                <Image
                    className="hidden sm:block ml-4"
                    src={"/assets/noteapplogo.png"}
                    alt="note app logo"
                    width={50}
                    height={50}
                />
                <Link className="btn btn-ghost text-2xl sm:text-6xl font-extrabold text-yellow-400 " href={"../dashboard"}>NOTE APP</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='hover:font-extrabold hover:text-white'><a>Dashboard</a></li>
                    <li className='hover:font-extrabold hover:text-white'><a href='http://locahost:3000/note/create'>Create Note</a></li>
                    <li className='hover:font-extrabold hover:text-white'><a>Settings 1</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn hover:bg-red-500 hover:text-white hover:font-extrabold">Sign Out</a>
            </div>
        </div>
    )
}

export default NavBar