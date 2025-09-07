import { 
    Sofa, 
    Network, 
    Wifi, 
    UtensilsCrossed, 
    WashingMachine, 
    ArrowUpDown, 
    Wind, 
    Thermometer,
    ChevronRight 
  } from 'lucide-react';
  

  interface AmenitiesCardProps {
    title?: string;
    amenities?: any[];
    onViewAllClick?: () => void;
    className?: string;
  }
  const AmenitiesCard = ({ 
    title = "Amenities",
    amenities = [
      { icon: "sofa", name: "Cable TV" },
      { icon: "network", name: "Internet" },
      { icon: "wifi", name: "Wireless" },
      { icon: "utensilsCrossed", name: "Kitchen" },
      { icon: "washingMachine", name: "Washing Machine" },
      { icon: "arrowUpDown", name: "Elevator" },
      { icon: null, name: "24-hour checkin" },
      { icon: "wind", name: "Hair Dryer" },
      { icon: "thermometer", name: "Heating" }
    ],
    onViewAllClick,
    className = ""
  }: AmenitiesCardProps) => {
    const getIcon = (iconName: any) => {
      const iconProps = { className: "h-4 w-4" };
      switch (iconName) {
        case 'sofa': return <Sofa {...iconProps} />;
        case 'network': return <Network {...iconProps} />;
        case 'wifi': return <Wifi {...iconProps} />;
        case 'utensilsCrossed': return <UtensilsCrossed {...iconProps} />;
        case 'washingMachine': return <WashingMachine {...iconProps} />;
        case 'arrowUpDown': return <ArrowUpDown {...iconProps} />;
        case 'wind': return <Wind {...iconProps} />;
        case 'thermometer': return <Thermometer {...iconProps} />;
        default: return null;
      }
    };
  
    return (
      <div className={`rounded-lg text-card-foreground p-6 mb-12 bg-white border-0 shadow-lg ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#333333]">
            <span>{title}</span>
          </h2>
          
          <button 
            onClick={onViewAllClick}
            className="justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-9 px-4 py-2 flex items-center gap-2 border-[#284E4C]/20 text-[#284E4C] hover:bg-[#284E4C]/5"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            data-state="closed"
          >
            <span>View all amenities</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
  
        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3 text-[#5C5C5A]">
              {amenity.icon && (
                <div className="p-2 rounded-full">
                  {getIcon(amenity.icon)}
                </div>
              )}
              <span className="capitalize">
                <span>{amenity.name}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AmenitiesCard;