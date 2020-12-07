import {useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost =() =>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#263238 blue-grey darken-4"})
            }
            else{
                M.toast({html: "created post succesfully",classes:"#263238 blue-grey darken-4"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","sethu")
        fetch("	https://api.cloudinary.com/v1_1/sethu/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    return(
         <div className="card input-field"
         style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center",
            borderRadius:"3%"
         }}
         >
             <h4><b>Write a review!!</b></h4>
            <input type="text" 
            placeholder="Enter service/product name"
            value = {title}
            onChange = {(e)=>setTitle(e.target.value)}
            />
            <input type="text" 
            placeholder="Write your review here"
            value = {body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn black">
                <span>Upload file</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-darken black"
            onClick={()=>postDetails()}
            >
                    Submit post
                </button>
         </div>
    )
}

export default CreatePost