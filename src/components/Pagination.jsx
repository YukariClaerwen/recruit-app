"use client";

import { CaretLeft, CaretRight, DotsThree } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
// import {  } from 'next/router';

const Pagination = ({ pages, parents, ...props }) => {

    const pathname = usePathname()
    const searchParams = useSearchParams();
    const router = useRouter();

    const [, ...pagination] = Array(pages + 1).keys();
    const _page = searchParams.has('page') ? parseInt(searchParams.get('page')) : 1
    const _pagination = pagination.filter(p => {
        if (p > _page - 3 && p < _page + 3)
            return p
    })

    const handlePagination = (e, page) => {
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams.toString());
        if (page === 'prev') {
            newParams.set('page', `${_page - 1}`)
        }
        else if (page === 'first') {
            newParams.set('page', 1)
        }
        else if (page === 'second' && pages != 5) {
            newParams.set('page', 2)
        }
        else if (page === 'fourth' && pages <= 5) {
            newParams.set('page', 4)
        }
        else if (page === 'last') {
            newParams.set('page', pages)
        }
        else if (page === 'next') {
            newParams.set('page', `${_page + 1}`)
        }
        else newParams.set('page', page)

        router.push(`${pathname}?${newParams.toString()}`);
    }

    return (
        <div {...props}>
            <div className="mb-5" >
                <nav aria-label="Page navigation">
                    <ul className={`pagination justify-content-center gap-4 ${parents == "white" ? 'parents-white' : ''}`}>
                        <li className="page-item out">
                            <Link
                                className={`page-link rounded-circle ${(_page == 1) ? 'disabled' : ''}`}
                                href="#" passHref
                                onClick={e => handlePagination(e, "prev")}
                                aria-label="Previous">
                                <span><CaretLeft size={10} weight="bold" /></span>
                            </Link>
                        </li>
                        <li>
                            <ul className="pagination in justify-content-center gap-2 rounded-pill">
                                <li className={`page-item ${(parseInt(_page) < 4) ? 'hidden' : ''}`}>
                                    <Link
                                        className={`page-link rounded-circle ${(_page == 1) ? 'disabled' : ''}`}
                                        href="#" passHref
                                        onClick={e => handlePagination(e, "first")}
                                        aria-label="First">
                                        <span>1</span>
                                    </Link>
                                </li>
                                <li className={`page-item ${(parseInt(_page) <= 4) ? 'hidden' : ''}`}>
                                    <Link
                                        className={`page-link rounded-circle ${(pages != 5) ? 'disabled' : ''}`}
                                        href="#" passHref
                                        onClick={e => handlePagination(e, "second")}
                                        aria-label="...">
                                        <span>{pages != 5 ? <DotsThree size={16} weight="bold" /> : "2"}</span>
                                    </Link>
                                </li>
                                {
                                    _pagination.map((page, index) => (
                                        <li
                                            key={index + 1}
                                            className={`page-item ${(page == _page) ? 'active' : ''} `}>
                                            <Link
                                                className="page-link rounded-circle"
                                                href="#" passHref
                                                onClick={e => handlePagination(e, page)}
                                                // href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${page}` : `?page=${page}`}
                                                aria-label={page}>
                                                {page}
                                            </Link>
                                        </li>
                                    ))
                                }
                                <li className={`page-item ${(parseInt(_page) > (pages - 4)) ? 'hidden' : ''}`}>
                                    <Link
                                        className={`page-link rounded-circle ${(pages > 5) ? 'disabled' : ''}`}
                                        href="#" passHref
                                        onClick={e => handlePagination(e, "fourth")}
                                        // href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=4` : `?page=4`}
                                        aria-label="...">
                                        <span>{pages != 5 ? <DotsThree size={16} weight="bold" /> : "4"}</span>
                                    </Link>
                                </li>
                                <li className={`page-item ${(parseInt(_page) > (pages - 3)) ? 'hidden' : ''}`}>
                                    <Link
                                        className={`page-link rounded-circle `}
                                        href="#" passHref
                                        onClick={e => handlePagination(e, "last")}
                                        // href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${pages}` : `?page=${pages}`}
                                        aria-label="last">
                                        <span>{pages}</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="page-item out">
                            <Link
                                className={`page-link rounded-circle ${(_page == pages) || (!_page) ? 'disabled' : ''}`}
                                href="#" passHref
                                onClick={e => handlePagination(e, "next")}
                                // href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${parseInt(_page) + 1}` : `?page=${parseInt(_page) + 1}`}
                                aria-label="Next">
                                <span><CaretRight size={10} weight="bold" /></span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Pagination