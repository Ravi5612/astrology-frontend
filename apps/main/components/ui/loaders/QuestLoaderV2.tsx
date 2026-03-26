"use client";

import { useQuotesLoader } from "./useQuotesLoader";
import QuotesLoaderContent from "./QuotesLoaderContent";

export default function QuotesLoaderV2() {
  const { isVisible, isFadingOut, currentQuote } = useQuotesLoader();

  if (!isVisible) return null;

  return (
    <QuotesLoaderContent
      currentQuote={currentQuote}
      isFadingOut={isFadingOut}
    />
  );
}
