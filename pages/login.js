import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import { getError } from '../utils/erros';
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';


export default function LoginScreen() {

  const { data: session } = useSession();
  const router = useRouter()
  const {redirect} = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }

    //when there is a change in the session, useEffect runs. And
    // if session.user has value, we redirect user to the redirected url what we have found at query
  }, [router, session, redirect]);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

    const submitHandler = async ({ email, password }) => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
        if (result.error) {
          toast.error(result.error)
        }
      } catch (err) {
        toast.error(getError(err));
      }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            // distructure the register function of useForm hook
            //its parameters are field name and validation options
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^[a-zA-Z0-9_.*+-]+@[a-zA-z0-9-]+.[a-zA-z0-9-.]+$/i,
                message: 'Please enter a valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
            <input
                type="password"
                {...register('password', {
                    required: 'Please enter password',
                    minLength: {
                        value: 6,
                        message: 'Password must be atleast 6 characters'
                    },
                })}
                className="w-full"
                id="password"
                autoFocus />
                {errors.password && (
                      <div className='text-red-500'>{ errors.password.message}</div>
                )}
                  
        </div>

        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>

        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
