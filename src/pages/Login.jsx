import LoginForm from "../components/LoginForm"
import { Toaster } from "react-hot-toast";

const Login = () =>{
    return(
        <>
        <LoginForm/>
        <Toaster position="top-center" reverseOrder={false}/>
        </>
    );
}
export default Login