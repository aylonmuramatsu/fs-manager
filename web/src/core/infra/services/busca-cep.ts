import ToastDefault from '@components/ToastDefault';
import Axios from 'axios';
import toast from 'react-hot-toast';

const buscaCep = Axios.create({
  baseURL: 'https://viacep.com.br/ws',
});
buscaCep.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.status && ![404, 400].includes(error.response.status)) {
      toast.custom(t => ToastDefault(t, "error", 'Sem comunicação com servidor, verifique sua conexão'))

    } else if (error.response.status === 404) {
      toast.custom(t => ToastDefault(t, "error", `${error.response.data?.message}`))


    } else {
      toast.custom(t => ToastDefault(t, "error", `${error.response.data?.message}`))

      error?.response?.data?.message.map((i:any) =>
        toast.custom(t => ToastDefault(t, "error", `${i}`))
      );
    }
    

    throw error.response.data;
  },
);

export default buscaCep;
