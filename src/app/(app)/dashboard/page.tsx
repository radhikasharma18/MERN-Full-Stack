'use client';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                    Welcome to Mystery Message
                </h1>
                <p className="text-gray-600">
                    Your anonymous adventure starts here. Sign up or log in to begin!
                </p>
            </div>
            <div className="flex justify-center space-x-4">
                <a
                    href="/sign-up"
                    className="bg-black hover:bg-black/50 text-white font-medium py-2 px-4 rounded"
                >
                    Sign Up
                </a>
                <a
                    href="/sign-in"
                    className="bg-black hover:bg-black/50 text-white font-medium py-2 px-4 rounded"
                >
                    Log In
                </a>
            </div>
        </div>
    </div>
  );
}

export default Page;
 