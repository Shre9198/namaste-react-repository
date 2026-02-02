import { useRouteError } from "react-router";
const Error = ()=>{
    const err = useRouteError();
    console.log(err);
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
                <h3 className="text-lg text-gray-600 mb-6">
                    {err?.status ? `${err.status}: ${err.statusText || 'Unknown Error'}` : 'Page Not Found'}
                </h3>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default Error;