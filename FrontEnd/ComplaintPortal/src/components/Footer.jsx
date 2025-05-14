import { Link } from "react-router";

const Footer = () => {
  return (
   <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 flex flex-wrap justify-between">
  <nav>
    <h6 className="footer-title">Services</h6>
    <Link to={"#branding"} className="link link-hover">Branding</Link>
    <Link to={"#design"} className="link link-hover">Design</Link>
    <Link to={"#marketing"} className="link link-hover">Marketing</Link>
    <Link to={"#advertisement"} className="link link-hover">Advertisement</Link>
  </nav>

  <nav>
    <h6 className="footer-title">Company</h6>
    <Link to={"#"} className="link link-hover">About us</Link>
    <Link to={"#"} className="link link-hover">Contact</Link>
    <Link to={"#"} className="link link-hover">Jobs</Link>
    <Link to={"#"} className="link link-hover">Press kit</Link>
  </nav>

  <nav>
    <h6 className="footer-title">Legal</h6>
    <Link to={"#"} className="link link-hover">Terms of use</Link>
    <Link to={"#"} className="link link-hover">Privacy policy</Link>
    <Link to={"#"} className="link link-hover">Cookie policy</Link>
  </nav>

  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="w-80">
      <label>Enter your email address</label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>

  {/* Copyright */}
  <div className="w-full text-center pt-6 text-sm text-gray-500">
    © 2025 Government Complaint Portal | Maintained by National Consumer Helpline
  </div>
</footer>

  );
}

export default Footer;
