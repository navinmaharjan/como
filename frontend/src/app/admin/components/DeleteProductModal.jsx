import { Button } from '@nextui-org/react'
import React  from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";


const DeleteProductModal = (props) => {
   
    const handleDelete = async () => {
        console.log(props)
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}` + '/products/' + `${props.product._id}`);
            toast.success('Product deleted successfully');
            props.onClose();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-4'>
            <div className='flex justify-center text-center'>
                <p>Are you sure you want to delete <span className=' font-medium'>{props.product.productName}</span> ?</p>
            </div>
            <div className='flex gap-2 mt-4 justify-center'>
                <Button onPress={handleDelete} className='bg-red-500 text-white' radius='none' disableAnimation>
                    Delete
                </Button>
                <Button onPress={props.onClose} className='bg-gray-200' radius='none' disableAnimation>
                    Cancel
                </Button>
            </div>

        </div>

    )
}

export default DeleteProductModal