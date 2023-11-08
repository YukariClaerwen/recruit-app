

const Dcard = ({ children, title, des, toplinks, ...props }) => {
    return (
        <div className="content-wrapper">
            <div className="d-card mb-5">
                <div className="card-body">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="card-title">{title}</p>
                            <p className="card-description">{des}</p>
                        </div>
                        {toplinks}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Dcard