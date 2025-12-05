import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/Command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import type { Machine } from "@/data/types/types";

interface MachineDropdownProps {
	mockMachines: Machine[];
	selectedMachineId: string | null;
	onMachineChange?: (id: string | null) => void;
}

const MachineDropdown = ({
	mockMachines,
	selectedMachineId,
	onMachineChange,
}: MachineDropdownProps) => {
	const selectedMachine = mockMachines.find(
		(m) => m.id === selectedMachineId
	);

	// show at most 5 machines
	const visibleMachines = useMemo(
		() => mockMachines.slice(0, 5),
		[mockMachines]
	);

	return (
		<div>
			<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">
				Select Machine
			</h3>

			<Popover>
				<PopoverTrigger asChild>
					<button className="w-full flex justify-between items-center rounded-md border border-border bg-background px-3 py-2 text-sm hover:border-destructive/60 transition-colors">
						<span className="truncate">
							{selectedMachine
								? `${selectedMachine.name} (${selectedMachine.serialNumber})`
								: "All machines"}
						</span>
					</button>
				</PopoverTrigger>

				<PopoverContent className="p-0">
					<Command>
						<CommandInput
							placeholder="Search machine..."
							className="h-9 text-xs focus:outline-none focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus:border-transparent"
						/>
						<CommandEmpty className="py-3 text-xs text-muted-foreground">
							No machines found.
						</CommandEmpty>
						<CommandGroup className="max-h-64 overflow-auto">
							<CommandItem
								onSelect={() => onMachineChange?.(null)}
								className="text-sm"
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										!selectedMachineId
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								All machines
							</CommandItem>

							{visibleMachines.map((m) => (
								<CommandItem
									key={m.id}
									onSelect={() => onMachineChange?.(m.id)}
									className="text-xs"
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selectedMachineId === m.id
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									<span className="truncate">
										{m.name} ({m.serialNumber})
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default MachineDropdown;
