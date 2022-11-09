import React  from 'react';
import SearchIcon from "@mui/icons-material/Search"; 


const GoogleSearch = (props) => {

    return (
        <div className="row col-8 mb-4 mb-4 d-flex justify-content-center">
        <form onSubmit={props.handleSubmit}>
            <input className=" input" onChange={props.handleChange} placeholder="Search by title on google's database" type="text"/>
            <button className=" btn-search" type="submit"><SearchIcon /></button>
        </form>
        </div>
    )
}

export default GoogleSearch;