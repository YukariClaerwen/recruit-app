import Link from "next/link"

const page = () => {
    return (
        <div>
            <section className="flex flex-col gap-12 items-center">
                <h1 className="text-3xl">Truy cập bị từ chối!</h1>
                <p className="text-2xl max-w-2xl text-center">
                    Bạn đã đăng nhập, nhưng bạn không được quyền truy cập vào trang hiện tại.
                </p>
                <Link href="/" className="text-3xl underline">Về trang chủ</Link>
            </section>
        </div>
    )
}

export default page