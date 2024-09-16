import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FAQ from "./components/FAQ";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FAQ />
    </QueryClientProvider>
  );
};

export default App;
