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
    name: 'Team',
    link: '/team',
    icon: 'team',   
    isActive: true
  },
  {
    name: 'Feature',
    link: '/feature',
    icon: 'feature',
    isActive: true
  },
  {
    name: 'Blog',
    link: '/blog',
    icon: 'blog',
    isActive: false
  }
]
