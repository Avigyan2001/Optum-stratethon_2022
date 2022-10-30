import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextWrapper, { Context } from './util/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ContextWrapper>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ContextWrapper>
	</React.StrictMode>
);
