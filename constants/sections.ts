import { Landing } from '../components/sections/Landing';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';

export const sections = [
  {
    id: '',
    child: Landing,
    title: 'Home',
    showTitle: false,
  },
  {
    id: 'about',
    child: About,
    title: 'About',
    showTitle: true,
  },
  {
    id: 'projects',
    child: Projects,
    title: 'Projects',
    showTitle: true,
  },
  {
    id: 'contact',
    child: Contact,
    title: 'Contact',
    showTitle: true,
  },
];
