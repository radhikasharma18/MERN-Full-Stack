import React from "react"

const Page = ({ params }: { params: { username: string } }) => {
  const { username } = params

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                   
                    radhika  This is a placeholder page for the user profile. You can customize this page to display user-specific information and content.
                     radhika  This is a placeholder page for the user profile. You can customize this page to display user-specific information and content.
                </h1>
                <p className="text-gray-600">
                  radhika  This is a placeholder page for the user profile. You can customize this page to display user-specific information and content.
                  
                        <span className="font-semibold">Welcome, {username}!</span>
                  
                </p>
            </div>
        </div>
    </div>
  )
}
export default Page;