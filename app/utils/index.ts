import { format, isValid, parseISO } from "date-fns";


export const unSlug = (slug: any) =>
    slug.split("-").pop() || "";

export const truncateToTwoDecimals = (num: number): number =>
    Math.floor(num * 100) / 100;

export const formatDate = (date: string, fmt: string): string => {
    const parsed = parseISO(date);
    if (!isValid(parsed)) {
        console.warn(`Invalid date string passed to formatDate: "${date}"`);
        return "Date Unknown";
    }

    return format(parsed, fmt);
};