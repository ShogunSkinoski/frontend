import { useState } from 'react';
import { 
  Calendar, 
  CalendarCheck, 
  MessageCircle, 
  Shield, 
  Users, 
  ChevronDown 
} from 'lucide-react';

interface BookingWidgetProps {
  title?: string;
  subtitle?: string;
  selectedDates?: any;
  guestCount?: number;
  maxGuests?: number;
  isAvailable?: boolean;
  onDateSelect?: () => void;
  onGuestCountChange?: () => void;
  onCheckAvailability?: () => void;
  onSendInquiry?: () => void;
  className?: string;
}

const BookingWidget = ({ 
  title = "Book your stay",
  subtitle = "Select dates to see the total price",
  selectedDates = null,
  guestCount = 1,
  maxGuests = 10,
  isAvailable = false,
  onDateSelect,
  onGuestCountChange,
  onCheckAvailability,
  onSendInquiry,
  className = ""
}: BookingWidgetProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    onDateSelect?.();
  };

  const handleGuestClick = () => {
    setIsGuestPickerOpen(!isGuestPickerOpen);
  };

  const handleCheckAvailability = () => {
    onCheckAvailability?.();
  };

  const handleSendInquiry = () => {
    onSendInquiry?.();
  };

  return (
    <div className={`text-card-foreground sticky top-24 overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg rounded-2xl ${className}`}>
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#284E4C]"></div>
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-[#FFFFFF] mb-1">
            <span>{title}</span>
          </h3>
          <p className="text-sm text-[#D2DADA]">
            <span>{subtitle}</span>
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4">
        {/* Date and Guest Selection */}
        <div className="space-y-1">
          <div className="flex gap-2">
            {/* Date Picker */}
            <div className="flex-1">
              <div className="grid w-full h-full [&>button]:w-full [&>button]:justify-start [&>button]:text-left [&>button]:h-[42px] [&>button]:bg-[#F1F3EE] [&>button]:border-0 [&>button]:shadow-sm [&>button]:hover:bg-[#FFFDF6] [&>button]:rounded-l-md [&>button]:rounded-r-none">
                <button 
                  onClick={handleDateClick}
                  className="inline-flex items-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input px-4 py-2 w-full h-full justify-start text-left font-normal bg-transparent border-0 shadow-none transition-colors rounded-none group hover:bg-transparent hover:text-current text-muted-foreground"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={isDatePickerOpen}
                  data-state={isDatePickerOpen ? "open" : "closed"}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    <span>{selectedDates || "Select dates"}</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Guest Count Selector */}
            <div className="w-[120px]">
              <button 
                onClick={handleGuestClick}
                type="button"
                role="combobox"
                aria-expanded={isGuestPickerOpen}
                aria-autocomplete="none"
                data-state={isGuestPickerOpen ? "open" : "closed"}
                className="flex w-full items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-[42px] bg-[#F1F3EE] border-0 shadow-sm hover:bg-[#FFFDF6] transition-colors text-[#333333] rounded-l-none rounded-r-md"
                aria-label="Select number of guests"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span style={{ pointerEvents: 'none' }}>{guestCount}</span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-6">
          <button 
            onClick={handleCheckAvailability}
            disabled={!selectedDates}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-12 rounded-md px-8 w-full bg-[#284E4C] hover:bg-[#284E4C]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            <span>Check availability</span>
          </button>

          <button 
            onClick={handleSendInquiry}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-12 rounded-md px-8 w-full border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5 hover:border-[#284E4C]/30"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Send Inquiry</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#5C5C5A] text-center mt-4">
          <span className="inline-flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>Instant confirmation</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookingWidget;