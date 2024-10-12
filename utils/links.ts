type NavLink = {
    href: string;
    label: string;
  };
  
  export const links: NavLink[] = [
    { href: '/', label: 'home' },
    // { href: '/favorites ', label: 'favorites' },
    // { href: '/bookings ', label: 'bookings' },
    // { href: '/reviews ', label: 'reviews' },
    // { href: '/reservations ', label: 'reservations' },
    { href: '/projects/create ', label: 'create project' },
    { href: '/projects', label: 'projects' },
    // { href: '/admin', label: 'admin' },
    { href: '/profile ', label: 'profile' },
  ];