
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight, DotsThree } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const Pagination = ({ pages, searchParams, urlSearchParams, parents }) => {
    
    const [, ...pagination] = Array(pages + 1).keys();
    const _page = searchParams?.page || 1;
    const _pagination = pagination.filter(p => {
        if (p > parseInt(_page) - 3 && p < parseInt(_page) + 3)
            return p
    })
    return (
        <div className="mb-5">
            <nav aria-label="Page navigation">
                <ul className={`pagination justify-content-center gap-4 ${parents == "white" ? 'parents-white' : ''}`}>
                    <li className="page-item out">
                        <Link
                            className={`page-link rounded-circle ${(_page == 1) ? 'disabled' : ''}`}
                            href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${parseInt(_page) - 1}` : `?page=${parseInt(_page) - 1}`}
                            aria-label="Previous">
                            <span><CaretLeft size={10} weight="bold" /></span>
                        </Link>
                    </li>
                    <li>
                        <ul className="pagination in justify-content-center gap-2 rounded-pill">
                            <li className={`page-item ${(parseInt(_page) < 4) ? 'hidden' : ''}`}>
                                <Link
                                    className={`page-link rounded-circle ${(_page == 1) ? 'disabled' : ''}`}
                                    href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=1` : `?page=1`}
                                    aria-label="First">
                                    <span>1</span>
                                </Link>
                            </li>
                            <li className={`page-item ${(parseInt(_page) <= 4) ? 'hidden' : ''}`}>
                                <Link
                                    className={`page-link rounded-circle ${(pages != 5) ? 'disabled' : ''}`}
                                    href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=2` : `?page=2`}
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
                                            href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${page}` : `?page=${page}`}>{page}</Link>
                                    </li>
                                ))
                            }
                            <li className={`page-item ${(parseInt(_page) > (pages - 4)) ? 'hidden' : ''}`}>
                                <Link
                                    className={`page-link rounded-circle ${(pages > 5) ? 'disabled' : ''}`}
                                    href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=4` : `?page=4`}
                                    aria-label="...">
                                    <span>{pages != 5 ? <DotsThree size={16} weight="bold" /> : "4"}</span>
                                </Link>
                            </li>
                            <li className={`page-item ${(parseInt(_page) > (pages - 3)) ? 'hidden' : ''}`}>
                                <Link
                                    className={`page-link rounded-circle `}
                                    href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${pages}` : `?page=${pages}`}
                                    aria-label="Next">
                                    <span>{pages}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="page-item out">
                        <Link
                            className={`page-link rounded-circle ${(_page == pages) || (!_page) ? 'disabled' : ''}`}
                            href={(searchParams?.key || searchParams?.location) ? `${urlSearchParams}&page=${parseInt(_page) + 1}` : `?page=${parseInt(_page) + 1}`}
                            aria-label="Next">
                            <span><CaretRight size={10} weight="bold" /></span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination