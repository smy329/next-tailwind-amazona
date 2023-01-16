import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import data from '../../utils/data';
import { Store } from '../../utils/Store';

const ProductScreen = () => {

  const {state, dispatch} = useContext(Store)
    
    const { query } = useRouter(); 
    const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  console.log({product})
    
    if (!product) {
        return <div>Product Not Found</div>;
    }
  
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...product,
        quantity
      }
    });
  }
  return (
    <Layout title={product.title}>
      <div>
        <Link href="/">Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            //  u can use below codes for responsive
            // width="0"
            // height="0"
            // sizes="100vw"
            // className="w-full h-auto"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>{product.price}</div>
            </div>
            <div className="flex mb-2 justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'Instock' : 'Unavailable'}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCartHandler}> Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen