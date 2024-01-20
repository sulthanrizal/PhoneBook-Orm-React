import FormBar from "./FormBar";
import PhoneList from "./PhoneList";



export default function PhoneBox({
    keyword,
    setKeyword,
    Delete,
    sort,
    setSort,
    item,
    setItem,
    isLoading,
    setIsLoading,
    page,
    setPage
}) {
    return (
        <div className="container">
            <div className="header">
                <FormBar keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} />
            </div>
            <div className="body">
                <PhoneList Delete={Delete} isLoading={isLoading} setIsLoading={setIsLoading} page={page} setPage={setPage} item={item} setItem={setItem} />
            </div>
        </div>
    )
}