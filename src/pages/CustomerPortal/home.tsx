import { Outlet } from 'react-router-dom';
import { HeaderMegaMenu } from './header/HeaderMegaMenu';
import { FooterLinks } from './footer/FooterLinks';
import { Carousel } from 'react-bootstrap';

function CustomerPortal() {
  return (
    <>
      <HeaderMegaMenu />
      
      <Outlet />
      <FooterLinks />
    </>
  );
}

export default CustomerPortal;
