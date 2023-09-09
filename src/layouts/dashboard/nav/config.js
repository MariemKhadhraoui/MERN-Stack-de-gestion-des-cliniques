// component

import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
 
  
  {
    title: 'Pharmacist',
    path: '/dashboard/Pharmacist',
    icon: icon('ic_blog'),
  },
  {
    title: 'Nurse',
    path: '/dashboard/Nurse',
    icon: icon('ic_blog'),
  },
  {
    title: 'service manger',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'DCLS ',
    path: '/dashboard/DCLS',
    icon: icon('ic_user'),
  },
 
  

  
  {
    title: 'services',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Loc Clinc',
    path: '/dashboard/maisonList',
    icon: icon('ic_user'),

  
  },
  
 

  

];

export default navConfig;
