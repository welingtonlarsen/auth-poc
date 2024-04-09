import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../app/userSlice';
import { EyeIcon } from './Login';
import { ExitIcon } from "@radix-ui/react-icons"
import { logout } from '../app/authSlice';
import globalRouter from '../config/globalRouter';

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchUser = () => {
    dispatch(fetchMe());
  };

  const doLogout = () => {
    dispatch(logout());
    globalRouter.navigate('/login')
  }


  return <>
      <Button type='button' onClick={doLogout} variant='secondary' className='fixed top-8 right-8'><ExitIcon className="mr-2 h-4 w-4" />Log out</Button>
      <Card className="w-full max-w-3xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-3xl font-bold">Your Account</CardTitle>
        <CardDescription>Manage your account settings and information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 items-center gap-6">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <p className="text-sm">{user ? user.name : '******'}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <p className="text-sm">{user ? user.email : '******'}</p>
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <Label htmlFor="website">Password</Label>
            <Button className="h-7 w-7 absolute" size="icon" variant="ghost" onClick={() => setShowPassword(!showPassword)} type='button' disabled={!user}>
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
          {(!showPassword || !user) && <p className="text-base font-medium">******</p>}
          {showPassword && user && <p className='text-rose-700 text-sm italic'>Your can't see it.</p>}
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Button onClick={fetchUser}>Fetch account information</Button>
      </CardFooter>
    </Card>
  </>;
}


export default HomePage;
