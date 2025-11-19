"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KurdsWithTopics } from "@/lib/kurds";
import Card from "./Card";

interface CardsProps {
  kurds: KurdsWithTopics;
  topics: string[];
  tags: string[];
  contributors: string[];
}

export default function Cards({
  kurds,
  topics,
  tags,
  contributors,
}: CardsProps) {
  const [topicQuery, setTopicQuery] = useState("all");
  const [tagQuery, setTagQuery] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredKurds = useMemo(() => {
    return kurds
      .filter(k =>
        k.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
      .filter(k => topicQuery === "all" || k.topics.includes(topicQuery))
      .filter(k => tagQuery === "all" || k.tags.includes(tagQuery));
  }, [kurds, topicQuery, tagQuery, debouncedSearchQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/" && searchRef.current) {
        searchRef.current.focus();
      }
    };

    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("keyup", handler);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchQuery(searchQuery), 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const selectOption = (value: string, label?: string) => (
    <SelectItem key={value} value={value}>
      {label ?? value}
    </SelectItem>
  );

  const contributorLogins = useMemo(
    () => contributors.map(contributor => contributor.toLowerCase()),
    [contributors]
  );

  const isContributor = (link: string) => {
    const normalizedLink = link.toLowerCase();
    return contributorLogins.some(login => normalizedLink.includes(login));
  };

  return (
    <section className="container space-y-10 py-16">
      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-6 p-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Topic</Label>
            <Select value={topicQuery} onValueChange={setTopicQuery}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent>
                {selectOption("all", "All topics")}
                {topics.map(topic => selectOption(topic))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Tag</Label>
            <Select value={tagQuery} onValueChange={setTagQuery}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="All tags" />
              </SelectTrigger>
              <SelectContent>
                {selectOption("all", "All tags")}
                {tags.map(tag => selectOption(tag))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-semibold">
              Search
            </Label>
            <div className="relative">
              <Input
                id="search"
                ref={searchRef}
                type="text"
                placeholder="Search by name…"
                title="CTRL + /"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {filteredKurds.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredKurds.map(kurd => (
            <Card
              key={kurd.link}
              kurd={kurd}
              contributor={isContributor(kurd.link)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed bg-muted/30 p-10 text-center">
          <p className="text-muted-foreground">
            No matches yet. Try a different topic, tag, or name.
          </p>
        </div>
      )}
    </section>
  );
}
