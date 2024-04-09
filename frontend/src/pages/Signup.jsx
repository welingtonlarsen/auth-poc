/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZxK0LbH49dv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "@/app/authSlice"
import globalRouter from "@/config/globalRouter"

export default function SingUpPage() {
  const [account, setAccount] = useState({firstName: '', lastName: '', email: '', password: ''})

  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUser(account));
  }

  return (
    <>
      <Card className="max-w-md w-full mx-auto">
        <form onSubmit={onSubmit}>
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Lee" required value={account.firstName} onChange={(e) => setAccount({...account, firstName: e.target.value})}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required value={account.lastName} onChange={(e) => setAccount({...account, lastName: e.target.value})}/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="m@example.com" required type="email" value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
            </div>
            <Button className="w-full" type='submit'>Sign Up</Button>
          </CardContent>
          <CardFooter className="text-sm text-center">
            Already have an account?&nbsp;
            <button className="underline" onClick={() => globalRouter.navigate('/login')}>
              Login
            </button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}

