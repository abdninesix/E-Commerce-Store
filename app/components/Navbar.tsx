'use client'

import useCart from '@/lib/useCart'
import { UserButton, useUser } from '@clerk/nextjs'
import { Heart, Menu, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {

    const {user} = useUser()
    const cart = useCart()

    const [dropdownMenu, setDropdownMenu] = useState(false);

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white text-base-bold'>
            <Link href="/"><Image src="/logo.png" alt="logo" width={130} height={100} /></Link>
            <Link href="/">Home</Link>
            <div className='relative flex items-center gap-4'>
                {user && <Menu onClick={()=>setDropdownMenu(!dropdownMenu)} className='cursor-pointer'/>}
                {user && dropdownMenu && (
                    <div className='flex flex-col gap-2 absolute top-10 right-5 p-2 rounded-lg border bg-white'>
                        <Link href="/cart" className='flex items-center gap-2'><ShoppingCart/>Cart ({cart.cartItems.length})</Link>
                        <Link href="/wishlist" className='flex items-center gap-2'><Heart/>Wishlist</Link>
                        <Link href="/orders" className='flex items-center gap-2'><ShoppingBag/>Orders</Link>
                    </div>
                )}
                {user ? (<UserButton/>) : (<Link href="/sign-in"><UserRound/></Link>)}
            </div>
        </div>
    )
}

export default Navbar