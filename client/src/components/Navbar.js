import {Link,useHistory} from 'react-router-dom'
import {useContext,useEffect,useRef,useState} from 'react'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
  const  searchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
   const {state,dispatch} = useContext(UserContext)
   const history = useHistory()
   useEffect(()=>{
       M.Modal.init(searchModal.current)
   },[])
  const renderList = ()=>{
    if(state){
      return [
      <div className="navAdjust">
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li key = '2'><Link to="/profile"><b>Profile</b></Link></li>,
        <li key = '3'><Link to="/myfollowingpost"><b>Subscriptions</b></Link></li>,
        <li key = '4'><Link to="/create"><b>Write a review!</b></Link></li>,
        <li key = '5'><button className="btn waves-effect waves-darken black"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
        </li>
      </div>
      ]
    }
    else{
      return [
        <li key = '6'><Link to="/signin"><b>Login</b></Link></li>,
        <li key = '7'><Link to="/signup" style={{marginRight:"20px"}}><b>Signup</b></Link></li>
      ]
    }
  }


  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }

  return(
      <nav>
      <div className="nav-wrapper white">
        <Link to={state?"/":"/signin"} className="brand-logo left" >Beluga</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}
export default NavBar