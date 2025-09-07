import { 
  Clock, 
  Shield, 
  CalendarClock,
  Ban,
  PawPrint,
  PartyPopper
} from 'lucide-react';

interface StayPoliciesCardProps {
  title?: string;
  checkInTime?: string;
  checkOutTime?: string;
  houseRules?: any[];
  cancellationPolicy?: any;
  className?: string;
}

const StayPoliciesCard = ({ 
  title = "Stay Policies",
  checkInTime = "3:00 PM",
  checkOutTime = "10:00 AM",
  houseRules = [
    { icon: "ban", text: "No smoking" },
    { icon: "pawPrint", text: "No pets" },
    { icon: "partyPopper", text: "No parties or events" },
    { icon: "shield", text: "Security deposit required" }
  ],
  cancellationPolicy = {
    shortStay: {
      title: "For stays less than 28 days",
      rules: [
        "Full refund up to 14 days before check-in",
        "No refund for bookings less than 14 days before check-in"
      ]
    },
    longStay: {
      title: "For stays of 28 days or more", 
      rules: [
        "Full refund up to 30 days before check-in",
        "No refund for bookings less than 30 days before check-in"
      ]
    }
  },
  className = ""
}: StayPoliciesCardProps) => {
  const getHouseRuleIcon = (iconName: any) => {
    const iconProps = { className: "h-5 w-5 text-[#5C5C5A]" };
    switch (iconName) {
      case 'ban': return <Ban {...iconProps} />;
      case 'pawPrint': return <PawPrint {...iconProps} />;
      case 'partyPopper': return <PartyPopper {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      default: return <Ban {...iconProps} />;
    }
  };

  return (
    <div className={`rounded-lg text-card-foreground p-6 mb-8 bg-white border-0 shadow-lg ${className}`}>
      <h2 className="text-2xl font-semibold mb-6 text-[#333333]">
        <span>{title}</span>
      </h2>
      
      <div className="space-y-8">
        {/* Check-in & Check-out Section */}
        <div className="bg-[#F1F3EE] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <Clock className="h-5 w-5 text-[#284E4C]" />
            </div>
            <h3 className="font-semibold text-lg text-[#333333]">
              <span>Check-in &amp; Check-out</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-[#5C5C5A]">
                <span>Check-in time</span>
              </p>
              <p className="font-semibold text-lg text-[#333333]">
                <span>{checkInTime}</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-[#5C5C5A]">
                <span>Check-out time</span>
              </p>
              <p className="font-semibold text-lg text-[#333333]">
                <span>{checkOutTime}</span>
              </p>
            </div>
          </div>
        </div>

        {/* House Rules Section */}
        <div className="bg-[#F1F3EE] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <Shield className="h-5 w-5 text-[#284E4C]" />
            </div>
            <h3 className="font-semibold text-lg text-[#333333]">
              <span>House Rules</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {houseRules.map((rule: any, index: any) => (
              <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4">
                {getHouseRuleIcon(rule.icon)}
                <p className="font-medium text-[#333333]">
                  <span>{rule.text}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Policy Section */}
        <div className="bg-[#F1F3EE] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full">
              <CalendarClock className="h-5 w-5 text-[#284E4C]" />
            </div>
            <h3 className="font-semibold text-lg text-[#333333]">
              <span>Cancellation Policy</span>
            </h3>
          </div>
          <div className="space-y-4">
            {/* Short Stay Policy */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium mb-2 text-[#333333]">
                <span>{cancellationPolicy.shortStay.title}</span>
              </h4>
              {cancellationPolicy.shortStay.rules.map((rule: any, index: any) => (
                <div key={index} className={`flex items-start gap-2 text-sm text-[#5C5C5A] ${index > 0 ? 'mt-1' : ''}`}>
                  <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0"></div>
                  <p><span>{rule}</span></p>
                </div>
              ))}
            </div>

            {/* Long Stay Policy */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium mb-2 text-[#333333]">
                <span>{cancellationPolicy.longStay.title}</span>
              </h4>
              {cancellationPolicy.longStay.rules.map((rule: any, index: any) => (
                <div key={index} className={`flex items-start gap-2 text-sm text-[#5C5C5A] ${index > 0 ? 'mt-1' : ''}`}>
                  <div className="w-2 h-2 bg-[#284E4C] rounded-full mt-1.5 flex-shrink-0"></div>
                  <p><span>{rule}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayPoliciesCard;