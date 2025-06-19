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
    name: 'Veo3',
    link: '/veo3',
    icon: 'veo3',
    isActive: true
  },
  {
    name: 'About',
    link: '/about',
    icon: 'about',
    isActive: true
  }
]
