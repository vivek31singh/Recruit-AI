import React, { useState } from 'react'
import { Input } from '../base/Input'

interface DropDownProps {
    options: string[]
}

export const DropDown: React.FC<DropDownProps> = ({ options}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string) => {
    setSearch(option)
    setIsOpen(false)
  }

 

  return (
    <div className="relative">
      <Input
      id='search'
        type="text"
        value={search}
        onChange={handleSearch}
        onClick={handleToggle}
        placeholder="Search"
      />
      {isOpen && (
        <div className="absolute w-full rounded shadow-lg p-2 text-black dark:text-white bg-gray-300">
          {options.filter(option => option.includes(search)).map(option => (
            <div
              key={option}
              className="p-2 hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

