

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function TopSearch() {
    return (
        <div className="sticky top-[-1px] z-30 header">
            <div className="px-3.5 lg:px-20 py-3 bg-white ">
                <SearchBar />
            </div>
        </div>
    )
}

export const SearchBar = () => {
    return (
        <form action="">
            <div className="flex justify-between gap-3">
                <div className="input-group basis-2/5">
                    <span className="input-group-text rounded-start-pill">
                        <MagnifyingGlass size={20} weight="thin" />
                    </span>
                    <input type="text" className="form-control rounded-end-pill" placeholder="Nhập từ khóa" />
                </div>
                <select className="form-select basis-2/5 rounded-pill" id="inputGroupSelect04">
                    <option defaultValue>Tất cả địa điểm</option>
                    <option value="1">Hồ Chí Minh</option>
                    <option value="2">Hà Nội</option>
                    <option value="3">Hải Phòng</option>
                </select>
                <button className="btn btn-outline-secondary basis-1/5 rounded-pill round-btn" type="button">Tìm việc ngay</button>
            </div>
        </form>
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