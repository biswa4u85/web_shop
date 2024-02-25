import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CiBarcode } from "react-icons/ci";
import { LiaProductHunt } from "react-icons/lia";
import { MainContext } from "../../../contexts/mainProvider";
import { IoIosSettings } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

export const Sidebar = () => {
  const { labels, logout, user, sidebar } = useContext(MainContext)

  let menuItems: any = [
    {
      icon: <LiaProductHunt />,
      label: "PRODUCTS",
      value: "",
      isShow: true,
    },
    {
      icon: <CiBarcode />,
      label: "SCANNER",
      value: "scanner",
      isShow: true,
    },
  ];

  return (
    <nav id="sidebar-admin-wraper" className={sidebar ? "active" : ''}>
      <div className="my-account-logo">
        <NavLink to="/">
          <img src="images/logo.png" alt="" />
        </NavLink>
        <span>{labels.sitename}</span>
      </div>

      <div className="admin-nav scrollbar-inner">
        <ul>
          {menuItems.map((item: any, key: any) => {
            if (item.isShow) {
              return (<li key={key} className="">
                <NavLink to={`/${item.value}`}>{item.icon}<span
                  className="admin-nav-text">{item.label}</span></NavLink>
              </li>);
            }
          })}
        </ul>
      </div>
      <div className="admin-logout-area">
        <div className="pro-pic-info-wrap d-flex">
          <div className="pro-log-left d-flex">
            <div className="pro-pic-box">
              {user?.image ? <img src={user?.image} alt="" /> : <FaRegUserCircle color="#000" size={30} />}
            </div>
            <div className="pro-pic-info">
              <strong>{user?.name ?? ""}</strong>
              <span>{user?.role ?? ""}</span>
            </div>
          </div>
          {/* <div className="pro-log-right d-flex">
            <span className="feather-icon has-toltip">
              <div onClick={() => logout()}><IoIosSettings /></div>
              <span className="header-toltip">Logout</span>
            </span>
          </div> */}
        </div>
      </div>
    </nav>
  );
};