/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
Link

export default function ProductItem({product}) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />

        {/* <Image
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        /> */}
      </Link>

      <div className=" flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
