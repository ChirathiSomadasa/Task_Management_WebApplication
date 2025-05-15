import { Link, useNavigate } from "react-router-dom";

function Header() {
  
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#046bba] shadow">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
          {/* Left side - Logo and name */}
          <div className="flex items-center gap-2">
           
            <Link to="/" className="flex items-center gap-2">
              <div className="text-lg font-semibold text-white">TaskEase</div>
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-2">
        
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;