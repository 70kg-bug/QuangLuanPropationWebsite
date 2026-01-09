import { useState } from 'react'
import './myFolder.css'

//never definne a component inside another component
const SearchBox = () =>{
    const [searchValue, setSearchValue] = useState("Search by name of folders")

    const submit = (event) => {
        event.preventDefault()
        console.log("form submited", event.target.value)
        setSearchValue("")
        
    }

    const handleSearchBox = (event) => {
        setSearchValue(event.target.value)
    }
        return(
            <div className='searchBox'>
                <p>See all your wonderful notes here</p>
                <form onSubmit={submit}>
                    <input
                    type="text"
                    className='searchInput'
                    onChange={handleSearchBox} 
                    value={searchValue}
                    />
                    <button className='searchBtn' type='submit'>Search</button>
                </form>
            </div>
        )
    }

const MyFolder = () => {
    return (
        <div>
            <h2><b>My folders</b></h2>
            <div className='container'>
                <SearchBox/>
                <button className='createFolderBtn'>Create new folder</button>
            </div>
        </div>
    )
}

export default MyFolder