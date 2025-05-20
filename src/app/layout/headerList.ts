export interface HeaderList {
  name: string;
  link: string;
  icon: string;
  isActive: boolean;
}

export const headerList: HeaderList[] = [
  {
    name: 'Home',
    link: '/',
    icon: 'home',
    isActive: true
  },
  {
    name: 'Courses',
    link: '/courses',
    icon: 'courses',
    isActive: true
  },
  {
    name: 'Teachers',
    link: '/teachers',
    icon: 'teachers',
    isActive: true
  },
  {
    name: 'Resources',
    link: '/resources',
    icon: 'resources',
    isActive: true
  },
  {
    name: 'About',
    link: '/about',
    icon: 'about',
    isActive: true
  }
]
