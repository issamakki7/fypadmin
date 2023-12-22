import "./Footer.css";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <div className="footercontainer">
        <div className="footerrow">
          <div className="footer-left">
            {/* Logo Image  */}
            <a className="company-logo" href="#">
              <h1>ARMS</h1>{" "}
            </a>
            <p className="slogan">Restaurant Management, Simplified</p>
          </div>

          <div className="footer-col">
            <h4>View</h4>
            <ul>
              <li>
                <a href="/bookings">Bookings</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/statistics">Statistics</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Edit</h4>
            <ul>
              <li>
                <a href="/edit">Edit Menu</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Send</h4>
            <ul>
              <li>
                <a href="/orders">Send Orders</a>
              </li>
            </ul>
          </div>
        
        </div>
      </div>

      <p className="copyright">Copyright ⓒ {year} ARMS</p>
    </footer>
  );
}

export default Footer;
