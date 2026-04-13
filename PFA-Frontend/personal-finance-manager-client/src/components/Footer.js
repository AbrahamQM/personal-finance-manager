// src/components/Footer.js

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <a
          className="footer-link"
          href="https://github.com/abrahamqm"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abraham Quintana Micó GitHub"
        >
          <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.2 9.14 7.64 10.62.56.1.76-.24.76-.53 0-.26-.01-1.12-.02-2.03-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .17 1.57-.75 1.57-.75.9-1.55 2.36-1.1 2.94-.84.09-.66.35-1.1.64-1.35-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.4.11-2.92 0 0 .95-.3 3.12 1.15a10.8 10.8 0 0 1 2.84-.38c.96.01 1.93.13 2.84.38 2.17-1.45 3.12-1.15 3.12-1.15.61 1.52.23 2.64.11 2.92.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.52.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .29.2.64.77.53C20.05 20.89 23.25 16.7 23.25 11.75 23.25 5.48 18.27.5 12 .5z"/>
          </svg>

          <span>Abraham Quintana Micó</span>
        </a>

        <span className="small-muted">· Full-Stack Developer ·</span>

        <span className="small-muted">Versión 1.0.0</span>
      </div>
    </footer>
  );
};

export default Footer;
