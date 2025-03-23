'use client'

import useCart from '@/lib/useCart'
import { useUser } from '@clerk/nextjs'
import { MinusCircle, PlusCircle, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Cart = () => {

  const router = useRouter()
  const { user } = useUser()
  const cart = useCart()

  const total = cart.cartItems.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0)
  const totalRounded = parseFloat(total.toFixed(2))

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  }

  const handleCheckout = async () => {
    try {
      if (!user) { router.push("/sign-in") }
      else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer })
        })
        const data = await res.json()
        window.location.href = data.url;
        console.log(data)
      }
    } catch (error) {
      console.log("[checkout_POST]", error)
    }
  }

  return (
    <div className='flex gap-20 py-16 px-10 max-lg:flex-col'>
      <div className='w-2/3 max-lg:w-full'>
        <p className='text-heading3-bold'>Your Cart</p>
        <hr className='my-6' />
        {cart.cartItems.length === 0 ? (<p className='text-body-bold'>No items in Cart</p>) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div className='w-full flex max-sm:flex-col max-sm:gap-3 rounded-lg hover:bg-gray-1 p-6 max-sm:items-start justify-between items-center'>
                <div className='flex items-center'>
                  <Image src={cartItem.item.media[0]} alt='Product' width={100} height={100} className='rounded-lg w-32 h-32 object-cover' />

                  <div className='flex flex-col gap-3 ml-4'>
                    <p className='text-body-bold'>{cartItem.item.title}</p>
                    {cartItem.color && (<p className='text-small-medium'>{cartItem.color}</p>)}
                    {cartItem.size && (<p className='text-small-medium'>{cartItem.size}</p>)}
                    <p className='text-small-medium'>${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                  <Trash onClick={() => cart.removeItem(cartItem.item._id)} className='cursor-pointer text-red-1' />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='w-1/3 max-lg:w-full flex flex-col gap-8 bg-gray-1 rounded-lg p-5'>
        <p className='text-heading4-bold pb-4'> Summary <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? 'items' : 'item'})`}</span></p>
        <div className='flex justify-between text-body-semibold'>
          <span>Total</span>
          <span>${totalRounded}</span>
        </div>
        <button
          onClick={handleCheckout}
          className='text-base-bold p-2 rounded-lg outline bg-white hover:bg-black hover:text-white'>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart