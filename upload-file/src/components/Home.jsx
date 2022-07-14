import './style.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth, signOutFunction } from './Firebase';
import { storage } from './Firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';

export const Home = () => {

    const [listUrl, setListUrl] = useState([])
    const [fileUrl, setFileUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const currentUser = useAuth();
    

    async function handleSignOut() {
        setLoading(true)
        try {
            await signOutFunction();
            navigate('/');
        }
        catch {
            alert("Failed to Log out!!!")
        }
        setLoading(false)
    }

    const handleAuthenticate = () => {
        navigate('/')
    }

    const handleForm = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file)
    }

    // useEffect(()=>{
    //     const getFiles = () => {
       
               
    //         console.log("called get files")
    //         console.log("printing current user after get fiel called",  "HxY37pgOTEeFCqvhsaNCBPp0LCo1")
    //         const storageRef = ref(storage, `HxY37pgOTEeFCqvhsaNCBPp0LCo1`);
    //         listAll(storageRef).then((res) => {
    //             console.log(res.items)
    
    //             const listUrl2 = []
    //             res.items.forEach((item) => {
    //                  getDownloadURL(item).then((url) => {
    //                     console.log("url of file", url)
                        
    //                     dataList.push(url);
    
    //                     console.log("list of url",dataList)
                    
    
    //                 })
                   
             
               
    //             })
    //             console.log("list of url at bottom",listUrl2)
    //             setListUrl([dataList])
                
     
    //         })
           
            
         
           
    //     }

    //     getFiles()

       
    // },[])

    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/${currentUser.uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress)
        }, (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    setFileUrl(url)
                })
            }
        )
    }

 const dataList = []


 const getFiles = () => {
       
               
    console.log("called get files")
    console.log("printing current user after get fiel called", currentUser.uid)
    const storageRef = ref(storage, `${currentUser.uid}`);
    listAll(storageRef).then((res) => {
        console.log(res.items)

        const listUrl2 = []
        res.items.forEach((item) => {
             getDownloadURL(item).then((url) => {
                console.log("url of file", url)
                
                dataList.push(url);

                console.log("list of url",dataList)
              
 setListUrl([dataList])

            })
           
     
       
        })
        console.log("list of url at bottom",listUrl2)
       
        

    })
   
    
 
   
}
    
    

    if (currentUser == null) {
        return (
            <>
                <h3>You can access this page when you are logged in</h3>
                <p>Please authenticate yourself</p>
                <button onClick={handleAuthenticate}>Authenticate</button>
            </>
        )
    }
    else {
        // console.log("printing current user", currentUser.uid)
       



         return (
            <>
           
             <div className='greeting'>Hello {currentUser?.email}!</div>
                <button disabled={loading} onClick={handleSignOut} className='signOutButon'>Log Out</button>
                <form onSubmit={handleForm}>
                    <input type="file" />
                    <button className='uploadButton'>Upload</button>
                </form>


                <a href={fileUrl}>{fileUrl}</a>
               
                <button onClick={getFiles}>get files</button>

            <div className="xyz">
           
            {listUrl.map((item,index) => (
            <a href = {item} key={index}>{item}</a>
            
            ))}
            </div>
            </>
    )

        // const newListUrl = listUrl.map(item => {
        //     return <li>{item}</li>
        // })

        // return (
        //     <>
        //         <div className='greeting'>Hello {currentUser?.email}!</div>
        //         <button disabled={loading} onClick={handleSignOut} className='signOutButon'>Log Out</button>
        //         <form onSubmit={handleForm}>
        //             <input type="file" />
        //             <button className='uploadButton'>Upload</button>
        //         </form>
        //         {/* <ul>{newListUrl}</ul> */}
        //         {/* <h3>Uploaded {progress} %</h3> */}
        //         {/* <a href="fileUrl">{fileUrl}</a> */}
        //         {listUrl.map((item, index) => <p key={index}>{item}</p>)}
        //     </>
        // )
    }



}
