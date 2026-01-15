
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css';
import { AuthProvider } from "@/Utils/Contexts/AuthContext";
import { AnalyticsProvider } from "@/Utils/Contexts/AnalyticsContext";
import { QuizProvider } from "@/Utils/Contexts/QuizContext";
import { ForumProvider } from "@/Utils/Contexts/ForumContext";
import { AchievementsProvider } from "@/Utils/Contexts/AchievementsContext";
import { InstrukturProvider } from "@/Utils/Contexts/InstrukturContext";
import ErrorBoundary from "@/Utils/Components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <AnalyticsProvider>
          <QuizProvider>
            <ForumProvider>
              <AchievementsProvider>
                <InstrukturProvider>
                  <Toaster position="top-right" />
                  <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </QueryClientProvider>
                </InstrukturProvider>
              </AchievementsProvider>
            </ForumProvider>
          </QuizProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
