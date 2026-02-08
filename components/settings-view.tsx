"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUser, saveUser, logoutUser } from "@/lib/user-storage"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { LogOut } from "lucide-react"

export function SettingsView() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)

    // Dummy state for detailed interactive settings
    const [isDark, setIsDark] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [commEmails, setCommEmails] = useState(true)
    const [mktEmails, setMktEmails] = useState(false)
    const [socEmails, setSocEmails] = useState(true)

    useEffect(() => {
        const u = getUser()
        if (!u) {
            // If no stored user, provide a default mock user for demonstration
            setUser({
                name: "Student User",
                email: "student@example.com",
                bio: "Learning every day!",
                phone: "555-0123"
            })
        } else {
            setUser(u)
        }
    }, [])

    const handleSave = () => {
        if (user) {
            saveUser(user)
            // In a real app, use a toast here
            alert("Profile updated successfully")
        }
    }

    const handleLogout = () => {
        logoutUser()
        router.push("/login")
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl animate-in fade-in duration-500">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-4 bg-muted/50 p-1">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Make changes to your public profile here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm">Change Avatar</Button>
                                </div>

                                <div className="flex-1 space-y-4 w-full max-w-2xl">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={user.name || ""}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input
                                            id="bio"
                                            value={user.bio || ""}
                                            placeholder="Tell us a little bit about yourself"
                                            onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={user.phone || ""}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end border-t pt-6 bg-muted/20">
                            <Button onClick={handleSave}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Update your account settings. Set your preferred language and timezone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user.email || ""} disabled className="bg-muted text-muted-foreground" />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    This is the email address associated with your account.
                                </p>
                            </div>

                            <div className="py-4">
                                <Separator />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between border-t pt-6 bg-muted/20">
                            <Button variant="destructive" onClick={handleLogout} className="gap-2 shadow-sm hover:shadow-md transition-all">
                                <LogOut className="h-4 w-4" />
                                Log out
                            </Button>
                            <Button onClick={() => alert("Password update simulated")}>Update Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the appearance of the application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Reduce eye strain and battery usage.
                                    </p>
                                </div>
                                <Switch
                                    checked={isDark}
                                    onCheckedChange={setIsDark}
                                />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Reduced Motion</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Minimize animations for a more static experience.
                                    </p>
                                </div>
                                <Switch
                                    checked={reducedMotion}
                                    onCheckedChange={setReducedMotion}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Communication Emails</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about your account activity and security.
                                    </p>
                                </div>
                                <Switch
                                    checked={commEmails}
                                    onCheckedChange={setCommEmails}
                                />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Marketing Emails</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about new products, features, and tips.
                                    </p>
                                </div>
                                <Switch
                                    checked={mktEmails}
                                    onCheckedChange={setMktEmails}
                                />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Social Emails</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails for friend requests, follows, and messages.
                                    </p>
                                </div>
                                <Switch
                                    checked={socEmails}
                                    onCheckedChange={setSocEmails}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end border-t pt-6 bg-muted/20">
                            <Button onClick={() => alert("Notification preferences saved")}>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
