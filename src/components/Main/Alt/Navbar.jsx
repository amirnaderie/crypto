import React,{useEffect} from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {getInboxCount,updateInbox} from "../../../redux/slices/mainsSlice"
import { connect } from "react-redux"
import MyBadge from './../../common/badge/badge';
import "./Navbar.css";

const NavBar = ({ menus,inboxCount,socket,user,getInboxCount,updateInbox }) => {
  

  useEffect(() => {
    async function fetchAPI() {
      if (user) 
      await getInboxCount(user._id);
      
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      if (socket)
      {socket.on("fileAdded", (data) => {
        updateInbox('Inc');
      });  
      }   
    }
    fetchAPI();
  }, [socket]);

  const localclass=()=>{
    return "text-decoration-none text-dark pt-3 pt-lg-0 px-1 px-lg-3 ";
  }
  return (
    menus.length !== 0 && (
      <div className="row" >
        
        <Navbar
          collapseOnSelect
          // bg="light"
          // variant="light"
          expand="lg"
          sticky="top"
          className="flex-row-reverse"
          style={{backgroundColor:"burlywood"}}
        >
          <Navbar.Brand>
            {inboxCount!==0 && <MyBadge value={inboxCount}/>}
            <Link to="/home" className="text-decoration-none ">
              <Nav.Link href="/home" className="besideBadge"> <img
                    src={process.env.PUBLIC_URL + "/images/flowers32.png"}
                    alt="Site Logo"
                  /></Nav.Link>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto ">
              {menus.map((item) => {
                return item["url"] !== "" && item["parentId"] === 0 ? (
                  <Link
                    key={item["id"]}
                    to={item["url"]}
                    className={localclass()}
                  >
                    <Nav.Link  href={item["url"]}>{item["label"]}</Nav.Link>
                  </Link>
                ) : item["url"] === "" && item["parentId"] === 0 ? (
                  <NavDropdown
                    title={item["label"]}
                    key={item["id"]}
                    id={"collasible-nav-dropdown" + item["id"]}
                    className={localclass()}
                    style={{backgroundColor:"burlywood"}}
                    renderMenuOnMount={true}
                  >
                    {menus.map((item1) => {
                      return (
                        item1["parentId"] === item["id"] && (
                          <Link
                            to={item1["url"]}
                            className="text-decoration-none  "
                            key={item1["id"]}
                          >
                            <Nav.Link href={item1["url"]}  >
                              {item1["label"]}
                            </Nav.Link>
                          </Link>
                        )
                      );
                    })}
                  </NavDropdown>
                ) : null;
              })}

              {/* 
            <NavDropdown title="YEET" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
         
          */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  inboxCount: state.mains.inboxCount
 
})

export default connect(mapStateToProps,{getInboxCount,updateInbox})(NavBar)

//export default NavBar;