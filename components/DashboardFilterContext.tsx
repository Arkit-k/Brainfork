"use client";
import React, { createContext, useContext, useState } from "react";

type DashboardFilterContextType = {
	filter: string;
	setFilter: (filter: string) => void;
};

const DashboardFilterContext = createContext<DashboardFilterContextType | undefined>(undefined);

export const DashboardFilterProvider = ({ children }: { children: React.ReactNode }) => {
	const [filter, setFilter] = useState<string>("ALL");
	return (
		<DashboardFilterContext.Provider value={{ filter, setFilter }}>
			{children}
		</DashboardFilterContext.Provider>
	);
};

export function useDashboardFilter() {
	const context = useContext(DashboardFilterContext);
	if (!context) {
		throw new Error("useDashboardFilter must be used within a DashboardFilterProvider");
	}
	return context;
}
