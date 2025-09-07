import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Building2 } from "lucide-react"
import { useState } from 'react';
const CurrencyDropdown = ({ className = '' , isScrolled = false}) => {
    const [isCurrenciesDropdownOpen, setIsCurrenciesDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState({
        name: 'GBP',
        flag: '£'
    });

    const handleCurrencySelect = (currency: { name: string, flag: string }) => {
        setSelectedCurrency(currency);
        setIsCurrenciesDropdownOpen(false);
    }
    const currencies = [
        {
            name: 'USD',
            flag: '$'
        },
        {
            name: 'EUR',
            flag: '€'
        }, 
        {
            name: 'GBP',
            flag: '£'
        }   
    ]
    return (
            <div className="relative inline-block text-left">
                  <DropdownMenu.Root open={isCurrenciesDropdownOpen} onOpenChange={setIsCurrenciesDropdownOpen} modal={false}>
                      <DropdownMenu.Trigger asChild>
                          <button className={isScrolled ? "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-white" : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 font-medium text-[#333333]"}>
                              {selectedCurrency.flag}
                              <span className='ml-4'>{selectedCurrency.name}</span>
                              
                          </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="absolute right-0 z-[200] mt-1 min-w-[8rem] overflow-hidden rounded-md p-1 text-popover-foreground bg-white border border-gray-200 shadow-lg" align="end">
                          {currencies.map((currency) => (
                                  <DropdownMenu.Item className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors cursor-pointer hover:bg-[#064749] hover:text-white focus:bg-[#064749] focus:text-white"
                                    key={currency.name}
                                  > 
                                      <span className={isScrolled ? "mr-2 text-white" : "mr-2 text-[#333333]"}>{currency.flag}</span>
                                      {currency.name}
                                  </DropdownMenu.Item>
                          ))}
                      </DropdownMenu.Content>
                  </DropdownMenu.Root>
            </div>
    )
}

export default CurrencyDropdown;