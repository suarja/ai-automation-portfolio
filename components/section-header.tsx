interface SectionHeaderProps {
  title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-full"></div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="ml-4 h-px flex-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
    </div>
  )
}
