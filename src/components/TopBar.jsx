import "./TopBar.css";
import { IoSearch } from "react-icons/io5";



function TopBar() {
  return (
   <div className="topbar">
  <div className="search__wrapper">
    <input
      type="text"
      placeholder="Search for books..."
      className="topbar__search"
    />
    <button className="search__btn">
      <IoSearch />
    </button>
  </div>
</div>
  );
}

export default TopBar;