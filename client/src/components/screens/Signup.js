import {useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignUp = ()=>{
    const history = useHistory()
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    const[email,setEmail] = useState("")
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email",classes:"#263238 blue-grey darken-4"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"##263238 blue-grey darken-4"})
            }
            else{
                M.toast({html: data.message,classes:"#263238 blue-grey darken-4"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
             <div className="card auth-card">
                <h2>Beluga</h2>
                <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light black"
                onClick={()=>PostData()}
                >
                
                    Create account
                </button>
                <h6>
                    <Link to="/signin">Already have an account?</Link>
                </h6>
      </div>
        </div>
    )
}

export default SignUp