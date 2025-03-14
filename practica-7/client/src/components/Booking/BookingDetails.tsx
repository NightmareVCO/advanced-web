import {Avatar, cn, Select, SelectItem, type SharedSelection} from "@heroui/react";
import {Icon} from "@iconify/react";
import {Tabs, Tab} from "@heroui/react";
import {type DateValue} from "@heroui/calendar";
import {useMemo} from "react";
import {format} from "date-fns";

import {DurationEnum, durations, type TimeSlot, timeZoneOptions} from "../../config/Calendar/calendar.config";

interface BookingDetailsProps {
  className?: string;
  selectedTimeZone: string;
  selectedDuration: DurationEnum;
  onTimeZoneChange?: (keys: SharedSelection) => void;
  onDurationChange?: (selectedKey: React.Key) => void;
  selectedTimeSlotRange?: TimeSlot[];
  selectedDate?: DateValue;
}

export default function BookingDetails({
  className,
  selectedTimeZone,
  selectedDuration,
  onDurationChange,
  onTimeZoneChange,
  selectedTimeSlotRange,
  selectedDate,
}: BookingDetailsProps) {
  const bookingDate = useMemo(() => {
    if (selectedDate) {
      const date = new Date(selectedDate.toString());

      return format(date, "EEEE, MMMM d, yyyy");
    }

    return "";
  }, [selectedDate]);

  return (
    <div className={cn("flex flex-col p-6 lg:w-[220px] lg:px-4 lg:pt-8", className)}>
      <p className="mb-2 text-lg font-semibold text-default-foreground">Reservación</p>
      <p className="mb-4 text-small text-default-500">
        Seleccione la fecha y la hora de su reserva en el horario disponible.
      </p>
      <div className="flex flex-col gap-3 mb-6">
        <div
          className={cn("flex items-start gap-2", {
            hidden: !bookingDate,
          })}
        >
          <Icon className="text-default-300" icon="solar:calendar-minimalistic-bold" width={16} />
          <div className="text-xs font-medium text-default-600">
            <p>{bookingDate}</p>
            <p>{`${selectedTimeSlotRange?.[0].label} - ${selectedTimeSlotRange?.[1].label}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="text-default-300" icon="solar:clock-circle-bold" width={16} />
          <p className="text-xs font-medium text-default-600">{selectedDuration}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="text-default-300" icon="lucide:building-2" width={16} />
          <p className="text-xs font-medium text-default-600">Zoom</p>
        </div>
      
      </div>
    </div>
  );
}
