import React from 'react'
import { AiFillFileAdd, AiOutlineHome } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
const NavItem =({to,value,Icon})=>{
  return(
    <NavLink className='flex items-center space-x-2' to={to}>
      {Icon}
      <span>{value}</span>
    </NavLink>
  )
}

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavItem to='/' value="Home" Icon={<AiOutlineHome size={25}/>}/>
        </li>
        <li>
        <NavItem to='/create-blog' value="createpost" Icon={<AiFillFileAdd size={25}/>}/>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
