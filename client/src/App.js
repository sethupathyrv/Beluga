import {useEffect,createContext,useReducer,useContext} from 'react'
import Particles from 'react-particles-js';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts"

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch}= useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(typeof(user),user)
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])

const particlesOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity:{
    onhover:{
      enable: true,
      "mode": "repulse"
    }
  }
}
  return(
    
    <Switch>
      
      <Route exact path = "/">
      <Particles className ='particles' params={particlesOptions}/>
        <Home/>
      </Route>
      <Route path="/signin">
      <Particles className ='particles' params={particlesOptions}/>
        <Signin/>
      </Route>
      <Route path="/signup">
      <Particles className ='particles' params={particlesOptions}/>
        <Signup/>
      </Route>
      <Route exact path="/profile">
      <Particles className ='particles' params={particlesOptions}/>
        <Profile/>
      </Route>
      <Route path="/create">
      <Particles className ='particles' params={particlesOptions}/>
        <CreatePost/>
      </Route>
      <Route path="/profile/:userid">
      <Particles className ='particles' params={particlesOptions}/>
        <UserProfile/>
      </Route>
      <Route path="/myfollowingpost">
      <Particles className ='particles' params={particlesOptions}/>
        <SubscribedUserPosts/>
      </Route>
    </Switch>

  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
