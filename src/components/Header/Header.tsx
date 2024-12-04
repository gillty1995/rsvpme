const Header = () => {
  return (
    <header className="bg-gradient-to-b from-header-bg to-bg-gradient p-4 flex justify-between items-center">
      <div className="font-rale font-thin text-header-text text-5xl absolute left-1/2 transform -translate-x-1/2">
        R S V P Me
      </div>
      <nav className="ml-auto">
        <ul className="flex space-x-4">
          <li>
            <button className="text-white text-lg hover:text-gray-200">
              Login
            </button>
          </li>
          <li>
            <button className="text-white text-lg hover:text-gray-200">
              About
            </button>
          </li>
          <li>
            <button className="text-white text-lg hover:text-gray-200">
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
