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

export const Footer = () => {
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
    <div className="cs-feedback-area bg-white cs-message-panel">
        <div className="cs-message-area-section">
          <button className="cs-panel-close cs-feedback-close"><i className="feather-x"></i></button>
          <div className="cs-panl-head">
            <h4 className="cs-msg-user-name">Give Your Feedback</h4>
          </div>
          <div className="cs-panl-body">

            <div className="card-reg-form">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="aon-inputicon-box">
                      <textarea className="form-control sf-form-textarea"
                        placeholder="Enter your Text"></textarea>
                      <i className="aon-input-icon fa fa-pencil"></i>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div className="cs-panl-footer text-right">
            <button className="admin-button m-r15" type="button">Cancel</button>
            <button className="admin-button" type="button">Save</button>
          </div>
        </div>
      </div>
  );
};
