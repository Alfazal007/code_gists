import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const GistSearchPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = () => {
		// Placeholder for search functionality
		console.log('Searching for:', searchQuery);
		// Here you would typically make an API call to search for gists
	};

	return (
		<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				<h1 className="text-4xl font-bold text-center text-white mb-8">
					Search Others' Gists
				</h1>
				<div className="space-y-4">
					<Input
						type="text"
						placeholder="Enter username or gist description"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full h-14 text-xl bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
					/>
					<Button
						onClick={handleSearch}
						className="w-full h-14 text-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
					>
						<Search className="mr-2 h-6 w-6" /> Search
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GistSearchPage;

