import { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

interface Props {
  // isLanding: boolean
}

export default function Layout({ children }: PropsWithChildren<Props>): JSX.Element {
  return (
    <>
      <Header quote="quote" />
        <main>
          {children}
        </main>
      <Footer
        something="..."
      />
    </>
  )
}