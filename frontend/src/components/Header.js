import { Link, useNavigate } from "react-router-dom";

function Header() {
  
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-6 lg:px-8">
          {/* Left side - Logo and name */}
          <div className="flex items-center gap-2">
           
            <Link to="/" className="flex items-center gap-2">
              <div className="text-lg font-semibold text-[#046bba]">TaskEase</div>
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-2">
           
  
              <button
               
                className="px-4 py-2 font-medium rounded-md transition-colors hover:bg-gray-100"
              >
                Sign Out
              </button>
          
              <>
                <Link to="/register">
                  <button className="px-4 py-2 font-medium text-white rounded-md bg-[#046bba] transition-colors hover:bg-[#034e87]">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-[22px] py-2 font-medium rounded-md transition-colors bg-gray-100 hover:bg-gray-200">
                    Login
                  </button>
                </Link>
              </>
        
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;