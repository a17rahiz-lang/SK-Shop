"use client"

import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchHero() {
  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-balance">What are you looking for?</h1>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-lg p-2 shadow-lg">
            {/* Location Select */}
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 border-0 focus:ring-0 text-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bangladesh</SelectItem>
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="sylhet">Sylhet</SelectItem>
                <SelectItem value="rajshahi">Rajshahi</SelectItem>
                <SelectItem value="khulna">Khulna</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="I am looking for..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Search Button */}
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
