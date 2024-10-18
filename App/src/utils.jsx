import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 2000
    });
}

export const toastError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 2000
    });
}