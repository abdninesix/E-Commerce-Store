
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import HeartFavorite from './HeartFavorite'

const ProductCard = ({ product }: { product: ProductType }) => {

    return (
        <div className='flex flex-col p-2 rounded-lg shadow-xl'>
            <Link href={`/products/${product._id}`} key={product._id} className='h-[300px] flex flex-col gap-2'>
                <Image key={product._id} src={product.media[0]} alt={product.title} width={250} height={100} className='h-[250px] rounded-lg object-cover' />
                <div>
                    <p className='text-base-bold'>{product.title}</p>
                    <p className='text-small-medium text-gray-2'>{product.category}</p>
                </div>
            </Link>
            <div className='flex justify-between items-center'>
                <p className='text-body-bold'>${product.price}</p>
                <HeartFavorite product={product}/>
            </div>
        </div>
    )
}

export default ProductCard