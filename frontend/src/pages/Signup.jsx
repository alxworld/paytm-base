import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'

export default function Signup() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center w-80 p-2 h-max px-4">
          <Heading title="Sign Up" />
          <SubHeading title="Enter your information to create an account" />
          <InputBox placeholder="placeholder" label="First Name" />
          <InputBox placeholder="placeholder" label="Last Name" />
          <InputBox placeholder="placeholder" label="Email" />
          <InputBox placeholder="placeholder" label="Password" />
          <div>
            <Button label={'Sign Up'} />
          </div>
          <BottomWarning label={'Already have an account?'} buttonText={'Sign in'} to={'/signin'} />
        </div>
      </div>
    </div>
  )
}
