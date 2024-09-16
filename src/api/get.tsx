import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface ReleaseNotesResponse {
  note: string;
  code: string;
  hardware_requirements: string;
}

// Fetch function using fetch API
const fetchReleaseNotes = async (): Promise<ReleaseNotesResponse> => {
  const response = await fetch("/api/app/v1/release_notes/english/");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// Hook using TanStack Query to fetch release notes
export const useReleaseNotes = (): UseQueryResult<
  ReleaseNotesResponse,
  Error
> => {
  return useQuery({
    queryKey: ["releaseNotes"],
    queryFn: fetchReleaseNotes,
  });
};
