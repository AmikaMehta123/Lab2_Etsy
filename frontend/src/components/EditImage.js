// import React from 'react'

// export const EditImage = () => {
//     window.Buffer = window.Buffer || require("buffer").Buffer;
//   const item = props.item;
//   const modalId=`modal${item.id}`;
//   const handleClose = props.handleClose
//   let initialState = {
//     id: item.id,
//     name: item.name,
//     category: item.category,
//     description: item.description,
//     price: item.price,
//     quantity: item.quantity
// 	}

//   const [selectedFile, setSelectedFile] = useState(item.picture);
    
//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const uploadFile1 = (file) => {
//        S3FileUpload.uploadFile(file, config)
//        .then((data)=> {
//         setSelectedFile(data.location)
//         alert("Image Uploaded")
//        }).catch( (err)=>{
//            alert(err)
//        })
//     }

//     //use state 
// 	const [formData, setFormData] = useState(initialState);

//   const handleEditItem = (e) => {
// 		e.preventDefault();
//     // setFormData({...formData, name: user});
// 		console.log(formData);

// 		axios.post(`${backendURL}/editItem`,{...formData, img: selectedFile}).then((res) => {
// 			if (res.status==200){
//         alert("item updated")
//         setFormData(initialState)
//         handleClose()
// 			} else {
//         console.log("Internal Server Error")
// 			}
// 		}).catch((err) => console.log(err));
// 	}

//   return (
//     <div>

// <div class="modal fade" id={modalId} tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
//       aria-hidden="true">
//       <div class="modal-dialog" role="document">
//         <div class="modal-content">
//           <div class="modal-header text-center">
//             <h4 class="modal-title w-100 font-weight-bold">EDIT IMAGE FOR SHOP</h4>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <br></br>
//           <div class="modal-body mx-3">
//             <div class="md-form mb-5">
//             </div>

//         <div class="md-form mb-4">
    
//             <input type="file" onChange={handleFileInput} />
//             <button onClick={() => uploadFile1(selectedFile)}>UPLOAD IMAGE</button>         
//         </div>

//       </div>
//       <div class="modal-footer d-flex justify-content-center">
//       <button onClick={handleEditItem} type="button" data-dismiss="modal" aria-label="Close">SEND</button>
//       </div>
//     </div>
//   </div>
//     </div>

//     </div>
//   )
// }
