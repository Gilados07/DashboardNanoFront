import { AppLayout } from "./components/features/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { DailyRecap } from "./pages/main/DailyRecap";
import { PublisherDecrease } from "./pages/main/PublisherDecrease";
import { PublisherIncrease } from "./pages/main/PublisherIncrease";
import { NewPlacementDaily } from "./pages/daily/NewPlacementDaily";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./pages/auth/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-1 flex-col gap-4">
        <Router>
          <AuthProvider>
            <AppLayout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route index element={<Navigate to="/main/recap" replace />} />
                <Route path="/main/recap" element={<DailyRecap />} />
                <Route
                  path="/daily/new-placements"
                  element={<NewPlacementDaily />}
                />
                <Route
                  path="/main/publisher-decrease"
                  element={<PublisherDecrease />}
                />
                <Route
                  path="/main/publisher-increase"
                  element={<PublisherIncrease />}
                />
              </Routes>
            </AppLayout>
          </AuthProvider>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
