'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, BarChart3, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assessment', label: 'Assessment', icon: BookOpen },
  { href: '/report', label: 'Reports', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-border bg-card p-6 pt-24 md:flex md:flex-col">
      <div className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive && 'bg-secondary text-primary-foreground hover:bg-secondary/90'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      <Button variant="outline" className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </Button>
    </nav>
  )
}
