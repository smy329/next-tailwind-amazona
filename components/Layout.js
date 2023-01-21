import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  //if we dont use useState, useEffect here, it will cause hyration error
  //https://nextjs.org/docs/messages/react-hydration-error
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    //when there will be change in cart.cartItems, setCartItemsCount will be upadated.
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    //function from kext-auth package
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* limit=1 means no of toast at the same time is 01 */}
      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex justify-between h-12 shadow-md items-center px-4">
            <Link href="/" className="text-lg font-bold">
              Amazona
            </Link>
            <div className="flex items-center">
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" classname="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    {/* profile option   */}
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>

                    {/* order history option  */}
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>

                    {/* logout option */}
                    <Menu.Item>
                      <a
                        href="#"
                        className="dropdown-link"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" classname="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container my-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 shadow-inner justify-center items-center">
          <p>Copyright 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
