import Link from 'next/link';

function Logo() {
  return (
    <Link href="/">
       <img src="/logo.png" alt="Example" className='h-10 w-10'/>
    </Link>
  )
}

export default Logo
