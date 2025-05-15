import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
// Material Icons
import AssignmentIcon from "@mui/icons-material/Assignment"
import LockIcon from "@mui/icons-material/Lock"
import SecurityIcon from "@mui/icons-material/Security"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const Login = () => {
  const navigate = useNavigate()

  const onSuccess = (credentialResponse) => {
    console.log("Credential Response:", credentialResponse)

    // Decode JWT payload
    const base64Url = credentialResponse.credential.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const profile = JSON.parse(window.atob(base64))

    console.log("Decoded User Profile:", profile)

    // Save user info to localStorage
    localStorage.setItem("user", JSON.stringify(profile))

    // Redirect to dashboard/home
    navigate("/")
  }

  const onError = () => {
    console.log("Login Failed")
    alert("Google Login failed. Please try again.")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
     
      <div
        className="hidden lg:flex lg:w-1/2 text-white p-12 flex-col justify-between"
        style={{ backgroundColor: "#046bba" }}
      >
        <div>
          <div className="flex items-center space-x-3">
            <AssignmentIcon style={{ fontSize: 32, color: "#ffffff" }} />
            <h1 className="text-2xl font-bold">TaskMaster Pro</h1>
          </div>
          <p className="mt-6 text-blue-100 text-lg">
            Streamline your workflow and boost productivity with our intuitive task management solution.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <CheckCircleIcon style={{ color: "#ffffff", marginTop: "2px" }} />
            <div>
              <h3 className="font-semibold text-lg">Organize Tasks Effortlessly</h3>
              <p className="text-blue-100">Create, assign, and track tasks with ease</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <CheckCircleIcon style={{ color: "#ffffff", marginTop: "2px" }} />
            <div>
              <h3 className="font-semibold text-lg">Collaborate Seamlessly</h3>
              <p className="text-blue-100">Work together with your team in real-time</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <CheckCircleIcon style={{ color: "#ffffff", marginTop: "2px" }} />
            <div>
              <h3 className="font-semibold text-lg">Track Progress</h3>
              <p className="text-blue-100">Monitor project status with intuitive dashboards</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">© 2023 TaskMaster Pro. All rights reserved.</div>
      </div>

      {/* Right side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div style={{ backgroundColor: "#046bba" }} className="text-white p-4 rounded-full">
              <LockIcon style={{ fontSize: 28 }} />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mb-8 text-center">Sign in to access your tasks and projects</p>

          <div className="mb-8">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              useOneTap
              theme="filled_blue"
              size="large"
              shape="rectangular"
              text="continue_with"
              width="100%"
            />
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <SecurityIcon style={{ fontSize: 16 }} />
            <p>Secure Google Authentication</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
