import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaGithub, FaTwitter } from 'react-icons/fa'

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden shadow-xl backdrop-blur-sm bg-white/30">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8 bg-white">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your ArtiCodeX  account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    required
                                    className="bg-gray-50"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm text-blue-600 underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" placeholder="password" required className="bg-gray-50" />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Login
                            </Button>
                            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
                                <span className="relative z-10 bg-white px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Button variant="outline" className="w-full">
                                    <FaGoogle className="mr-2" />
                                    Google
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <FaGithub className="mr-2" />
                                    GitHub
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <FaTwitter className="mr-2" />
                                    Twitter
                                </Button>
                            </div> */}
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="text-blue-600 underline underline-offset-4 hover:text-blue-800">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden  md:block ">
                  
                        <div className="absolute inset-0 flex items-center bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-400 justify-center p-6">
                            <div className="text-center text-white tracking-wide">
                                <h2 className="text-2xl font-bold text-white  mb-2">Welcome to ArtiCodeX </h2>
                                <p className="text-sm text-white ">Experience the future of productivity</p>
                            </div>
                        </div>
                        {/* Add subtle animated elements */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-md animate-blob" />
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-2000" />
                            <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4000" />
                            <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-md animate-blob animation-delay-4000" />

                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-gray-600 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-200">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

