import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {/* if the auth in the component is true, wrap it inside Auth. In the
        Auth, if the user is not loggedin, redirect user to the unauthrized page  */}
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

// this function restrict unauthorized users
function Auth({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    //useSession is required
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });

  if (status == 'loading') {
    return <div>Loading...</div>;
  }
  return children;
}

export default MyApp;
