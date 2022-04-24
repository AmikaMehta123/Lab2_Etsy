import React, {useState} from 'react'
import S3FileUpload from 'react-s3';


const FileUpload = () => {
    
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const config = {
        bucketName: 'etsy-images',
        region: 'us-east-1',
        accessKeyId: 'AKIA4DQU3WWTZLVZSGZO',
        secretAccessKey: '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',
        signatureVersion: 'v4',
    }
 
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile1 = (file) => {
       S3FileUpload.uploadFile(file, config)
       .then((data)=> {
        console.log(data.location)
       }).catch( (err)=>{
           alert(err)
       })
    }
    


  return (
    <div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile1(selectedFile)}> Upload to S3</button>
    </div>
  )
}

export default FileUpload