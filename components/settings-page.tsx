'use client'

import { Mail, Bell, Lock, Palette, Globe, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SettingsPage() {
  return (
    <main className="flex-1 pb-12 pt-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Alex" placeholder="First name" className="border-border bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Johnson" placeholder="Last name" className="border-border bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex@eduai.com" placeholder="Email" className="border-border bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" placeholder="Phone" className="border-border bg-muted/30" />
              </div>
            </div>
            <Button className="gap-2 bg-secondary hover:bg-secondary/90">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Bell className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control how you receive updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: 'Assessment Reminders', description: 'Get reminded when new assessments are available' },
              { label: 'Performance Alerts', description: 'Receive notifications about your progress' },
              { label: 'AI Tutor Tips', description: 'Get daily learning tips from your AI tutor' },
              { label: 'Email Notifications', description: 'Receive updates via email' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Palette className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select defaultValue="advanced">
                <SelectTrigger className="border-border bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select defaultValue="english">
                <SelectTrigger className="border-border bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="mandarin">Mandarin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Enable dark theme for reduced eye strain</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="gap-2 bg-secondary hover:bg-secondary/90">
              <Save className="h-4 w-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Lock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" className="border-border bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" className="border-border bg-muted/30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" className="border-border bg-muted/30" />
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 font-medium text-foreground">Two-Factor Authentication</p>
              <p className="mb-4 text-sm text-muted-foreground">Enhance your account security with 2FA</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <Button className="gap-2 bg-secondary hover:bg-secondary/90">
              <Save className="h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent">
                Clear All Data
              </Button>
              <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10 bg-transparent">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
