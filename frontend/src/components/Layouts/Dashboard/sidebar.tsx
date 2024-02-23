import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MainContext } from "../../../contexts/mainProvider";

export const Sidebar = () => {
  const { logout, user } = useContext(MainContext)

  let menuItems: any = [
    {
      icon: <MdOutlineSportsBaseball />,
      label: "APARTMENTS",
      value: "admin/apartments",
      isShow: true,
    },
    {
      icon: <HiOutlineUserCircle />,
      label: "FAVORITES",
      value: "admin/favorites",
      isShow: true,
    },
  ];

  return (
    <nav id="sidebar-admin-wraper">
      <div className="my-account-logo">
        <NavLink to="/admin">
          <img src="images/logo-dark.png" alt="" />
        </NavLink>
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
              <img src="images/user.jpg" alt="" />
            </div>
            <div className="pro-pic-info">
              <strong>{user?.full_name ?? ""}</strong>
              <span>{user?.full_name ?? ""}</span>
            </div>
          </div>
          <div className="pro-log-right d-flex">
            <span className="feather-icon has-toltip">
              <div onClick={() => logout()}><i className="feather-power"></i></div>
              <span className="header-toltip">Logout</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};