import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FiltersProps {
  selectedArea: string;
  selectedCity: string;
  onAreaChange: (value: string) => void;
  onCityChange: (value: string) => void;
  areas: string[];
  cities: string[];
}

export const Filters = ({
  selectedArea,
  selectedCity,
  onAreaChange,
  onCityChange,
  areas,
  cities,
}: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Select value={selectedArea} onValueChange={onAreaChange}>
        <SelectTrigger className="w-[200px] bg-card border-border">
          <SelectValue placeholder="Filtrar por área" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as áreas</SelectItem>
          {areas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-[200px] bg-card border-border">
          <SelectValue placeholder="Filtrar por cidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as cidades</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};