'use client';

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"
import Select from 'react-select'

// import useSWR from 'swr';
// const fetcher = (url) => fetch(url).then((res) => res.json());

const SearchJobForm = ({ data }) => {
    return (
        <form action="/jobs" >
            <div className="flex justify-between gap-3">
                <div className="input-group basis-2/5">
                    <span className="input-group-text rounded-start-pill">
                        <MagnifyingGlass size={20} weight="thin" />
                    </span>
                    <input type="text" className="form-control rounded-end-pill" placeholder="Nhập từ khóa" name="key" />
                </div>
                <Select
                    className="form-control basis-2/5 rounded-pill flex flex-col items-stretch place-content-center z-50"
                    options={data} name="location"
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            border: state.isFocused ? 'none' : 'none',
                            border: state.isSelected ? 'none' : 'none',
                            boxShadow: 'none',
                        })
                    }}
                    placeholder="Chọn địa điểm"
                    isMulti
                />
                {/* <select className="form-select basis-2/5 rounded-pill" name="location">
                    <option value="all" defaultValue>Tất cả địa điểm</option>
                    {data.map(loc => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                    ))}
                </select> */}
                <button className="btn btn-outline-secondary basis-1/5 rounded-pill round-btn" type="submit">Tìm việc ngay</button>
            </div>
        </form>
    )
}

export default SearchJobForm