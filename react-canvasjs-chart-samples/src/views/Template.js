import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { BrowserRouter } from "react-router-dom";

import Sidebar from "./layout/Sidebar";
import Content from "./layout/Content";
import MyNavbar from '../Components/MyNavbar';

class Template extends Component {
  
  render() {    
    return (
		<div>
			<MyNavbar />
			<BrowserRouter>		  
				
							<Content />								
									
			</BrowserRouter>	
		</div>
    );
  }
}

export default Template;