import React, {useState} from 'react'
import Pagination from './Pagination';
import PaginationNums from './PaginationNums';

function CardGrid(props) {
    const items = props.data;
    const shop = props.shop;
    const inputText = props.input;

    const [currentPage, setCurrentPage] =useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;

    const filteredData = items.filter((el) => {
        if (inputText === '') {
            return el;
        } else {
            return el.name.toLowerCase().includes(inputText);
            // return el.text.toLowerCase().includes(props.input)
        }
    })
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const currentItems = filteredData.slice(indexOfFirstPost, indexOfLastPost); 
  return (
    <>
        <Pagination data={currentItems} shop={shop}></Pagination>
        <br></br>
        <PaginationNums postsPerPage={itemsPerPage} totalPosts={filteredData.length} paginate={paginate}/>
        <select onChange={(e)=>setItemsPerPage(e.target.value)} className="form-select pageSelect" aria-label="Default select example" >
            <option value="2">2 per page</option>
            <option value="5" selected>5 per page</option>
            <option value="10">10 per page</option>
        </select>
    </>
  )
}

export default CardGrid