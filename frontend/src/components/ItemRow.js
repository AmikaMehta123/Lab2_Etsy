import React from 'react'

export default function ItemRow(props) {
    const item = props.item;
    const modalId=`#modal${item.id}`;
    const handleOpen = props.handleOpen
    console.log(handleOpen)
  return (
      <>      
    <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-8'>
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-2">
                <img src={item.picture} class="card-img" alt="..." height={150} width={150}/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{item.name}</h5>
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <label>Shop: {item.shop}</label>
                        </div>
                        <div className='col-sm-4'>
                        <label>Quantity: {item.quantity}</label>
                        </div>
                        <div className='col-sm-4'>
                            <label>Category: {item.category}</label>
                        </div>
                    </div>
                    
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-4'>
                        <label>Description: {item.description}</label>
                        </div>
                        <div className='col-sm-4'>
                        
                        </div>
                        <div className='col-sm-4'>
                        <label>Price: {item.price}</label>
                        </div>
                    </div>
                    
                    
                    <button onClick={handleOpen} type="button" data-toggle="modal" data-target={modalId}>EDIT ITEM</button>
                    <br></br>
                    <br></br>
                 
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <br></br>
    </>

  )
}
