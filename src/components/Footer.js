import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Link style={{ textDecoration: 'none' }} to="/sign-in">
        <p className="footer__copyright">{`© ${new Date().getFullYear()} Mesto Russia`}</p>
      </Link>
    </footer>
  );
};

export default Footer;
