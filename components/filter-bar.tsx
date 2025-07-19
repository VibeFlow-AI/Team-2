import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FilterBar() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <Select>
        <SelectTrigger className="w-full sm:w-64 bg-white border border-gray-300 rounded-lg">
          <SelectValue placeholder="Select by Session Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30min">30 minutes</SelectItem>
          <SelectItem value="1hour">1 hour</SelectItem>
          <SelectItem value="1.5hour">1.5 hours</SelectItem>
          <SelectItem value="2hour">2 hours</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" className="bg-black text-white hover:bg-gray-800 border-black rounded-lg px-6">
        Clear Filters
      </Button>
    </div>
  )
}
