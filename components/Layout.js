import React from 'react'
import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex justify-between h-12 shadow-md items-center px-4">
            <Link href="/" className="text-lg font-bold">
              Amazona
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className='container my-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 shadow-inner justify-center items-center'>
            <p>Copyright 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
};

export default Layout