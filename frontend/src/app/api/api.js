const getAllProducts = async () => {
    const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const data = res.json()
    return data;
}

export {
    getAllProducts
}