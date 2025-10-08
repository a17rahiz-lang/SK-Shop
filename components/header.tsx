"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Plus, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold">Jiji</div>
            </Link>
            <div className="hidden md:block text-sm font-medium">SELL FASTER, BUY SMARTER</div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/about" className="text-sm hover:opacity-80 transition-opacity">
              About Us
            </Link>
            <Link href="/help" className="text-sm hover:opacity-80 transition-opacity">
              Help
            </Link>
            <Link href="/contact" className="text-sm hover:opacity-80 transition-opacity">
              Contact
            </Link>
          </nav>

          {/* Auth and Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden sm:flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary-foreground text-primary">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.displayName || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-ads">My Ads</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden sm:inline-flex text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="hidden sm:inline-flex text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
              <Link href="/post-ad">
                <Plus className="w-4 h-4 mr-1" />
                Post Ad
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
