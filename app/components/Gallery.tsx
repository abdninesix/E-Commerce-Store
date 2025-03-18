'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const Gallery = ({ productMedia }: { productMedia: string[] }) => {

    const [mainImage, setMainImage] = useState(productMedia[0])

    return (
        <div className='flex flex-col gap-3 max-w-[500px]'>
            <Image src={mainImage} alt='products' width={800} height={800} className='w-96 h-96 rounded-lg shadow-xl object-cover' />
            <div className='flex gap-2 overflow-auto tailwind-scrollbar-hide'>
                {productMedia.map((image, index) => (
                    <Image
                        onClick={() => setMainImage(image)}
                        key={index} src={image}
                        alt='product'
                        height={200}
                        width={200}
                        className={`${mainImage === image ? "border-2 border-black" : ""} w-20 h-20 rounded-lg object-cover cursor-pointer`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Gallery