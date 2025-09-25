import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function LoginForm({
  className,
  ...props

}) {

  
  console.log(props);
  
  return (
    <div className={cn("w-full max-w-md flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your AadharCardNumber below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={props.data.submit} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="text">AadharCardNumber</Label>
                <Input value={props.data.aadharCardNumber} onChange={(e) => props.data.setAadharCardNumber(e.target.value)} id="aadharcardnumber" type="text" placeholder="Enter your AadharCardNumber" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                 
                </div>
                <Input value={props.data.password} onChange={(e) => props.data.setPassword(e.target.value)} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
             <NavLink to={'/signup'}>signup</NavLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
