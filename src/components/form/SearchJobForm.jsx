'use client';

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const SearchJobForm = ({data}) => {
    return (
        <form  action="/jobs" >
            <div className="flex justify-between gap-3">
                <div className="input-group basis-2/5">
                    <span className="input-group-text rounded-start-pill">
                        <MagnifyingGlass size={20} weight="thin" />
                    </span>
                    <input type="text" className="form-control rounded-end-pill" placeholder="Nhập từ khóa"  name="key"/>
                </div>
                <select className="form-select basis-2/5 rounded-pill" name="location">
                    <option value="all" defaultValue>Tất cả địa điểm</option>
                    {data.map(loc => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                    ))}
                    {/* <option value="1">Hồ Chí Minh</option>
                    <option value="2">Hà Nội</option>
                    <option value="3">Hải Phòng</option> */}
                </select>
                <button className="btn btn-outline-secondary basis-1/5 rounded-pill round-btn" type="submit">Tìm việc ngay</button>
            </div>
        </form>
    )
}

export default SearchJobForm