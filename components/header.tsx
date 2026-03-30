'use client'

import { Bell, Settings, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const router = useRouter()
  const { data: session } = useSession()
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications: string[] = [] // Or fetch from backend if integrated

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo and Title */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-secondary flex-shrink-0">
            <span className="text-base sm:text-lg font-bold text-primary-foreground">L</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-foreground">
              LEARNLY
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Stress Less • Study Smart
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="relative flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-24 top-12 w-64 rounded-lg border bg-white shadow-lg p-3 space-y-2">
              <p className="text-sm font-semibold">Notifications</p>
              {notifications.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No new notifications
                </p>
              ) : (
                notifications.map((note: string, i: number) => (
                  <div
                    key={i}
                    className="text-xs p-2 rounded bg-muted"
                  >
                    {note}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/settings')}
          >
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Profile / Logout */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => router.push('/settings')}
          >
            <User className="h-4 w-4" />
            <span>{session?.user?.name || 'Profile'}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  )
}
