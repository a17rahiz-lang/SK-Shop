import Link from "next/link"
import {
  Car,
  Home,
  Smartphone,
  Laptop,
  Sofa,
  Shirt,
  Sparkles,
  Wrench,
  Hammer,
  Briefcase,
  Bike,
  Baby,
  Apple,
  PawPrint,
  BriefcaseBusiness,
  FileText,
} from "lucide-react"

const categories = [
  { name: "Vehicles", icon: Car, href: "/category/vehicles" },
  { name: "Property", icon: Home, href: "/category/property" },
  { name: "Mobile Phones & Tablets", icon: Smartphone, href: "/category/mobile" },
  { name: "Electronics", icon: Laptop, href: "/category/electronics" },
  { name: "Home, Furniture & Appliances", icon: Sofa, href: "/category/home" },
  { name: "Fashion", icon: Shirt, href: "/category/fashion" },
  { name: "Beauty & Personal Care", icon: Sparkles, href: "/category/beauty" },
  { name: "Services", icon: Wrench, href: "/category/services" },
  { name: "Repair & Construction", icon: Hammer, href: "/category/repair" },
  { name: "Commercial Equipment & Tools", icon: Briefcase, href: "/category/commercial" },
  { name: "Leisure & Activities", icon: Bike, href: "/category/leisure" },
  { name: "Babies & Kids", icon: Baby, href: "/category/babies" },
  { name: "Food, Agriculture & Farming", icon: Apple, href: "/category/food" },
  { name: "Animals & Pets", icon: PawPrint, href: "/category/pets" },
  { name: "Jobs", icon: BriefcaseBusiness, href: "/category/jobs" },
  { name: "Seeking Work - CVs", icon: FileText, href: "/category/cvs" },
]

export function CategorySidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="leading-tight">{category.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
