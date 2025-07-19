"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterState {
  duration: string
  subjects: string[]
  languages: string[]
  educationLevels: string[]
}

interface EnhancedFilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Art",
  "Commerce",
]
const LANGUAGES = ["English", "Tamil", "Sinhala", "Hindi", "French", "Spanish"]
const EDUCATION_LEVELS = ["Grade 9", "Ordinary Level", "Advanced Level", "University"]

export default function EnhancedFilterBar({ filters, onFiltersChange, onClearFilters }: EnhancedFilterBarProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "subjects" | "languages" | "educationLevels", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const removeFilter = (key: "subjects" | "languages" | "educationLevels", value: string) => {
    const newArray = filters[key].filter((item) => item !== value)
    updateFilter(key, newArray)
  }

  const hasActiveFilters =
    filters.duration ||
    filters.subjects.length > 0 ||
    filters.languages.length > 0 ||
    filters.educationLevels.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Duration Filter */}
        <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
          <SelectTrigger className="w-full sm:w-64 bg-white border border-gray-300 rounded-lg">
            <SelectValue placeholder="Select by Session Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1hour">1 hour</SelectItem>
            <SelectItem value="2hours">2 hours</SelectItem>
            <SelectItem value="3hours">3 hours</SelectItem>
          </SelectContent>
        </Select>

        {/* Subjects Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Subjects {filters.subjects.length > 0 && `(${filters.subjects.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {SUBJECTS.map((subject) => (
              <DropdownMenuCheckboxItem
                key={subject}
                checked={filters.subjects.includes(subject)}
                onCheckedChange={() => toggleArrayFilter("subjects", subject)}
              >
                {subject}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Languages Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Languages {filters.languages.length > 0 && `(${filters.languages.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {LANGUAGES.map((language) => (
              <DropdownMenuCheckboxItem
                key={language}
                checked={filters.languages.includes(language)}
                onCheckedChange={() => toggleArrayFilter("languages", language)}
              >
                {language}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Education Levels Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              Education Level {filters.educationLevels.length > 0 && `(${filters.educationLevels.length})`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {EDUCATION_LEVELS.map((level) => (
              <DropdownMenuCheckboxItem
                key={level}
                checked={filters.educationLevels.includes(level)}
                onCheckedChange={() => toggleArrayFilter("educationLevels", level)}
              >
                {level}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="outline" className="bg-black text-white hover:bg-gray-800">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.duration && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Duration: {filters.duration}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("duration", "")} />
            </Badge>
          )}
          {filters.subjects.map((subject) => (
            <Badge key={subject} variant="secondary" className="flex items-center gap-1">
              {subject}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("subjects", subject)} />
            </Badge>
          ))}
          {filters.languages.map((language) => (
            <Badge key={language} variant="secondary" className="flex items-center gap-1">
              {language}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("languages", language)} />
            </Badge>
          ))}
          {filters.educationLevels.map((level) => (
            <Badge key={level} variant="secondary" className="flex items-center gap-1">
              {level}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeFilter("educationLevels", level)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
