"use client";

import Image from "next/image";
import { useState } from "react";
import { UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card as CardShell,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPhoto } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { KurdWithTopics } from "@/lib/kurds";

interface CardProps {
  kurd: KurdWithTopics;
  contributor: boolean;
}

export default function Card({ kurd, contributor }: CardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const photoSrc = getPhoto(kurd);

  return (
    <CardShell className="flex h-full flex-col transition hover:shadow-lg">
      <a
        href={kurd.link}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col"
      >
        <CardHeader className="space-y-4 p-0">
          <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-muted">
            {imageFailed ? (
              <div className="flex h-full w-full items-center justify-center">
                <UserRound className="h-12 w-12 text-muted-foreground" />
              </div>
            ) : (
              <Image
                src={photoSrc}
                alt={kurd.name}
                fill
                sizes="(max-width: 768px) 80vw, 300px"
                className="object-cover"
                onError={() => setImageFailed(true)}
                priority={false}
              />
            )}
          </div>
          <div className="px-6 pt-4">
            <CardTitle className="text-2xl">{kurd.name}</CardTitle>
            <CardDescription>{kurd.topics.join(", ")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-wrap gap-2 px-6 pb-6 pt-2">
          {contributor && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-900">
              Contributor
            </Badge>
          )}
          {kurd.tags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className={cn("capitalize", {
                "border-green-200 text-green-700": contributor,
              })}
            >
              {tag}
            </Badge>
          ))}
        </CardContent>
      </a>
    </CardShell>
  );
}
