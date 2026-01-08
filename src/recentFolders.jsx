import "./recentFolders.css"
const Folder = (props) =>{
    return (
        <div className="folder">
            <p className="folderName">{props.folderName}<span className="date">{props.date}</span></p>
            <div className="folderContent">
                <p className="content">{props.content}</p>
                <button className="viewFolderButton"></button>
            </div>
        </div>
    )
}

const clicked = () =>{
    console.log('See all button clicked');
}

const RecentFolder = () => {
    const numberOfFolders = 7
    if (numberOfFolders <= 5){
        return (
            <>
                <h2><b>Recent folders</b></h2>
                <div className="recentFolders">
                    <Folder folderName="Folder name" date="21/2/2025" content="ajalkjfdsaj jmfdsjalk jlsaiuoweqirum"/>
                    <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                    <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                    <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                    <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                </div>
            </>
        )
    }
    return (
        <>
            <h2><b>Recent folders</b></h2>
            <div className="recentFolders">
                <Folder folderName="Folder name" date="21/2/2025" content="ajalkjfdsaj jmfdsjalk jlsaiuoweqirum"/>
                <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                <Folder folderName="Folder name" date="21/2/2025" content="Flimborax quindle spravuto mengen plarix doverin skemlata rovink talpres underbo flenstar vogrim."/>
                <button className="seeAllButton" onClick={clicked}>See All</button>
            </div>
        </>
    )
 
}
export default RecentFolder