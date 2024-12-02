import { useState } from "react";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Logo from "../assets/LOGO-BLANCO.png";

const NavbarNav = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args} color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img src={Logo} style={{ maxHeight: "50px", maxWidth: "150px" }} alt="Logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret size="lg" style={{ color: "white", textDecoration: "none", fontWeight: "bolder" }}>
                Diesel
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" style={{ color: "black", textDecoration: "none" }}>Diesel</DropdownItem>
                <DropdownItem href="/Bombas" style={{ color: "black", textDecoration: "none" }}>Bombas</DropdownItem>
                <DropdownItem href="/Inyectores" style={{ color: "black", textDecoration: "none" }}>Inyectores</DropdownItem>
                <DropdownItem href="/Embalaje" style={{ color: "black", textDecoration: "none" }}>Embalaje</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="/Turbo" style={{ color: "white", textDecoration: "none", fontWeight: "bolder" }}>Turbo</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/Dpf" style={{ color: "white", textDecoration: "none", fontWeight: "bolder" }}>DPF</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret size="lg" style={{ color: "white", textDecoration: "none", fontWeight: "bolder" }}>
                Vehicular
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem href="/Vehicular" style={{ color: "black", textDecoration: "none" }}>Vehicular</DropdownItem> */}
                <DropdownItem href="/AlvaroR" style={{ color: "black", textDecoration: "none" }}>Alvaro Ramirez</DropdownItem>
                <DropdownItem href="/AdrianS" style={{ color: "black", textDecoration: "none" }}>Adrian Soto</DropdownItem>
                <DropdownItem href="/ArielS" style={{ color: "black", textDecoration: "none" }}>Ariel Segovia</DropdownItem>
                <DropdownItem href="/JuanR" style={{ color: "black", textDecoration: "none" }}>Juan Rodriguez</DropdownItem>
                <DropdownItem href="/MiltonR" style={{ color: "black", textDecoration: "none" }}>Milton Rivas</DropdownItem>
                <DropdownItem href="/PabloZ" style={{ color: "black", textDecoration: "none" }}>Pablo Zuñiga</DropdownItem>
                <DropdownItem href="/SergioP" style={{ color: "black", textDecoration: "none" }}>Sergio Parra</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="/Garantia" style={{ color: "white", textDecoration: "none", fontWeight: "bolder" }}>Garantía</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarNav;
