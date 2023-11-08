
const loading = () => {
  return (

    <div className="spinner-container z-[2000] flex justify-center items-center">
      <div className="loading-jumping-dots flex justify-center items-center" role="status">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}

export default loading