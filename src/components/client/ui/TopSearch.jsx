
import { getLocation } from "@/app/api/dashboard/form";
import SearchJobForm from "@/components/form/SearchJobForm";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default async function TopSearch() {
    // const locations = await getLocation();
    // console.log(locations)
    return (
        <div className="sticky top-[-1px] z-30 header">
            <div className="px-3.5 lg:px-20 py-3 bg-white ">
                <SearchBar />
            </div>
        </div>
    )
}



// const SearchBar = async () => {

//   return (
//     <SearchJobForm data={data} />
//   )
// }

export const SearchBar = async () => {
    const locations = await getLocation();
    return (
        <SearchJobForm data={locations} />
    )
}

export const SearchNav = () => {
    return (
        <form action="">
            <div className="input-group">
                <span className="input-group-text rounded-start-pill">
                    <MagnifyingGlass size={24} weight="thin" />
                </span>
                <input type="text" className="form-control rounded-end-pill" placeholder="Tìm kiếm" />
            </div>
        </form>
    )
}