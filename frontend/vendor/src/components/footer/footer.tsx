const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Footer */}
      <footer className="footer px-6 pb-3 flex items-center justify-between gap-2 flex-col sm:flex-row">
        <p>{year} © Copyright&nbsp;Dreams AI Agent</p>
        <div className="flex items-center gap-2 flex-wrap">
          <a href="#" className="hover:text-primary">
            Docs
          </a>
          <span>/</span>
          <a href="#" className="hover:text-primary">
            Purchase
          </a>
          <span>/</span>
          <a href="#" className="hover:text-primary">
            FAQ
          </a>
          <span>/</span>
          <a href="#" className="hover:text-primary">
            Support
          </a>
        </div>
      </footer>
      {/* End Footer */}
    </>
  );
};

export default Footer;