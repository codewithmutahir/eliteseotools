/**
 * Rank Checker Form Component
 */

"use client";

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import type { RankCheckParams, LocationOption } from '@/types/rank';

interface RankFormProps {
  onSubmit: (params: RankCheckParams) => void;
  isLoading: boolean;
}

const LOCATION_OPTIONS: Array<{ value: LocationOption; label: string }> = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'global', label: 'Global' },
];

export function RankForm({ onSubmit, isLoading }: RankFormProps) {
  const [domain, setDomain] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState<LocationOption>('us');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!domain.trim() || !keyword.trim()) {
      return;
    }

    onSubmit({
      domain: domain.trim(),
      keyword: keyword.trim(),
      location,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="domain" className="text-sm font-medium mb-2 block">
          Domain
        </label>
        <Input
          id="domain"
          type="text"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          disabled={isLoading}
          required
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter the domain to check (e.g., example.com)
        </p>
      </div>

      <div>
        <label htmlFor="keyword" className="text-sm font-medium mb-2 block">
          Keyword
        </label>
        <Input
          id="keyword"
          type="text"
          placeholder="Enter keyword to search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isLoading}
          required
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter the keyword to check ranking for
        </p>
      </div>

      <div>
        <label htmlFor="location" className="text-sm font-medium mb-2 block">
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value as LocationOption)}
          disabled={isLoading}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {LOCATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          Select the search location
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !domain.trim() || !keyword.trim()}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking Rank...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Check Rank
          </>
        )}
      </Button>
    </form>
  );
}

