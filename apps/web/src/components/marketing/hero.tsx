import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge, Button } from "@openstatus/ui";

import { Shell } from "@/components/dashboard/shell";
import { getGitHubStars } from "@/lib/github";
import { numberFormatter } from "@/lib/utils";

export function Hero() {
  return (
    <Shell className="text-center">
      <Link
        href="https://twitter.com/mxkaske/status/1685666982786404352?s=20"
        target="_blank"
        rel="noreferrer"
      >
        <Badge variant="outline">
          Announcement Post <ChevronRight className="ml-1 h-3 w-3" />
        </Badge>
      </Link>
      <h1 className="text-foreground font-cal mb-6 mt-2 text-3xl">
        Open-source monitoring service
      </h1>
      <p className="text-muted-foreground mx-auto mb-6 max-w-lg text-lg">
        OpenStatus is an open source monitoring services with incident
        managements.
      </p>
      {/* much better than using flex without text alignment, text stays center even thought not same length */}
      <div className="my-4 grid gap-2 sm:grid-cols-2">
        <div className="text-center sm:block sm:text-right">
          <Button className="w-48 rounded-full sm:w-auto" asChild>
            <Link href="/app/sign-up">Get Started</Link>
          </Button>
        </div>
        <div className="text-center sm:block sm:text-left">
          <Button
            variant="outline"
            className="w-48 rounded-full sm:w-auto"
            asChild
          >
            <Link href="/github" target="_blank">
              Star on GitHub{" "}
              <Suspense fallback={<StarsBadgeFallback />}>
                <StarsBadge />
              </Suspense>
            </Link>
          </Button>
        </div>
      </div>
    </Shell>
  );
}

function StarsBadgeFallback() {
  return (
    <Badge variant="secondary" className="ml-1">
      ~
    </Badge>
  );
}

async function StarsBadge() {
  const stars = await getGitHubStars();
  return (
    <>
      <Badge variant="secondary" className="ml-1 hidden sm:block">
        {numberFormatter(stars)}
      </Badge>
      <Badge variant="secondary" className="ml-1 block sm:hidden">
        {stars}
      </Badge>
    </>
  );
}