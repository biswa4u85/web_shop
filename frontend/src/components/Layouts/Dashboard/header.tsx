import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import {
  AiOutlineSetting,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { MdOutlineSportsBaseball } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MainContext } from "../../../contexts/mainProvider";
import { Row, Col, Typography, Button } from "antd";
const { Text } = Typography;

export const Header = () => {
  const { logout, sidebar, setSidebar, user } = useContext(MainContext)
  let navigate = useNavigate();

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

  useEffect(() => {
    setSidebar(!isMobile)
  }, [isMobile])

  const gotoPage = (link: any) => {
    if (isMobile) {
      setSidebar(false)
    }
    navigate(link)
  };

  return (
    <header id="header-admin-wrap" className="header-admin-fixed">

      {/* Header Start */}
      <div id="header-admin">
        <div className="container">

          {/* Left Side Content */}
          <div className="header-left">

            <a className="nav-btn-admin" id="sidebarCollapse">
              <span className="fa fa-reorder"></span>
            </a>

            <div className="header-widget aon-admin-search-box">
              <div className="aon-admin-search ">
                <input className="form-control sf-form-control" name="company_name" type="text"
                  placeholder="Search" />
                <button className="admin-search-btn"><i className="fs-input-icon feather-search"></i></button>
              </div>
            </div>

          </div>
          {/* Left Side Content End */}

          {/* Right Side Content */}
          <div className="header-right">

            <ul className="header-widget-wrap">
              <li className="header-widget has-toltip">
                <div className="aon-admin-notification sf-toogle-btn">
                  <i className="feather-bell"></i>
                  <span className="notification-animate">8</span>
                </div>

                <div className="ws-toggle-popup popup-tabs-wrap-section popup-notifica-msg">
                  <div className="popup-tabs-wrap">

                    <div className="popup-tabs-head d-flex justify-content-between align-items-center">
                      <div className="popup-tabHead-left">
                        <h5 className="m-a0">Notification</h5>
                      </div>
                      <div className="popup-tabHead-right">Mark all as Read</div>
                    </div>

                    <div className="popup-tabs">
                      <div className="tab-content">
                        <div id="accepted1" className="tab-pane active">
                          <div className="ws-poptab-list-wrap">
                            {/*list One*/}
                            <div className="ws-poptab-list">
                              <div className="ws-poptab-media">
                                <img src="images/testimonials2/pic1.jpg" alt="" />
                              </div>
                              <div className="ws-poptab-info">
                                <h6>David Chua</h6>
                                <p>David wood requested to change.</p>
                                <span className="ws-time-duration">8 mins ago</span>
                              </div>
                            </div>

                            {/*list Two*/}
                            <div className="ws-poptab-list">
                              <div className="ws-poptab-media">
                                <img src="images/testimonials2/pic2.jpg" alt="" />
                              </div>
                              <div className="ws-poptab-info">
                                <h6>Lussa Smith</h6>
                                <p>David wood requested to change.</p>
                                <span className="ws-time-duration">4 mins ago</span>
                              </div>
                            </div>

                            {/*list three*/}
                            <div className="ws-poptab-list">
                              <div className="ws-poptab-media">
                                <img src="images/testimonials2/pic3.jpg" alt="" />
                              </div>
                              <div className="ws-poptab-info">
                                <h6>Zilia Wood</h6>
                                <p>David wood requested to change.</p>
                                <span className="ws-time-duration">2 mins ago</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="popup-tabs-footer">
                      <a href="#" className="site-button-link">Mark all as Read</a>
                    </div>

                  </div>
                </div>
              </li>
              <li className="header-widget has-toltip">
                <div className="aon-admin-messange sf-toogle-btn">
                  <i className="feather-globe"></i>
                </div>
                <div className="ws-toggle-popup popup-tabs-wrap-section popup-curra-lang">
                  <div className="popup-tabs-head d-flex justify-content-between align-items-center">
                    <div className="popup-tabHead-left">
                      <h5 className="m-a0">Language</h5>
                    </div>
                  </div>
                  <ul className="popup-curra-lang-list">
                    <li>English</li>
                    <li>Franais</li>
                    <li>Espaol</li>
                    <li>Deutsch</li>
                  </ul>
                </div>
              </li>
              <li className="header-widget">
                <div className="aon-admin-messange sf-toogle-btn">
                  <span className="feather-user-pic"><img src="images/user.jpg" alt="" /></span>
                </div>
                <div className="ws-toggle-popup popup-tabs-wrap-section user-welcome-area">
                  <div className="popup-tabs-head d-flex justify-content-between align-items-center">
                    <div className="popup-tabHead-left">
                      <h5 className="m-a0">David Wood</h5>
                    </div>
                  </div>
                  <ul className="user-welcome-list">
                    <li><a href="#"><i className="feather-sliders"></i> Dashboard</a></li>
                    <li><a href="#"><i className="feather-file"></i> Add Listing</a></li>
                    <li><a href="#"><i className="feather-settings"></i> Setting</a></li>
                    <li onClick={()=>logout()}><a href="#"><i className="feather-log-out"></i> Log Out</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* Right Side Content End */}

        </div>
      </div>
      {/* Header End */}

    </header>
  );
};
