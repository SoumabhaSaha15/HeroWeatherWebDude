import React from 'react';

export const WeatherDetailsSkeleton = () => (
  <div className="card bg-linear-to-br from-sky-200/40 to-blue-200/40 backdrop-blur-md shadow-xl border border-white/50">
    <div className="card-body">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="skeleton h-8 w-56 bg-white/40"></div>
        <div className="skeleton h-6 w-24 bg-white/40 rounded-full"></div>
      </div>

      <div className="divider my-2"></div>

      {/* Details Grid Skeleton */}
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm rounded-xl p-4">
              <div className="skeleton w-12 h-12 rounded-full bg-white/50 shrink-0"></div>
              <div className="skeleton h-6 w-32 bg-white/50"></div>
              <div className="flex-1"></div>
              <div className="skeleton h-7 w-28 bg-white/50"></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export const WeatherSkeleton = () => (
  <div className="card bg-linear-to-br from-orange-200/40 to-yellow-200/40 backdrop-blur-md shadow-xl border border-white/50">
    <div className="card-body">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="skeleton h-10 w-48 bg-white/40"></div>
        <div className="skeleton h-5 w-40 bg-white/40"></div>
      </div>

      <div className="divider my-2"></div>

      {/* Weather Icon and Description Skeleton */}
      <div className="flex items-center justify-center gap-4 mb-6 bg-white/30 backdrop-blur-sm rounded-2xl p-6">
        <div className="skeleton w-24 h-24 rounded-xl bg-white/50"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-7 w-32 bg-white/50"></div>
          <div className="skeleton h-5 w-40 bg-white/50"></div>
        </div>
      </div>

      <div className="divider my-2"></div>

      {/* Temperature Stats Skeleton */}
      <div className="stats stats-vertical sm:stats-horizontal shadow-lg bg-white/50 backdrop-blur-sm w-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat place-items-center">
            <div className="skeleton h-5 w-20 bg-white/40 mb-2"></div>
            <div className="skeleton h-10 w-16 bg-white/40 mb-1"></div>
            <div className="skeleton h-4 w-16 bg-white/40"></div>
          </div>
        ))}
      </div>

      {/* Additional Details Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="skeleton h-4 w-20 bg-white/40 mx-auto mb-2"></div>
            <div className="skeleton h-8 w-24 bg-white/40 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ForecastSkeleton = () => (
  <div className="card bg-linear-to-br from-purple-200/40 to-pink-200/40 backdrop-blur-md shadow-xl border border-white/50 h-full">
    <div className="card-body">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-10 w-64 bg-white/40"></div>
        <div className="skeleton h-8 w-32 bg-white/40 rounded-full"></div>
      </div>

      <div className="divider my-2"></div>

      {/* Date Tabs Skeleton */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-12 w-28 bg-white/40 rounded-xl shrink-0"></div>
        ))}
      </div>

      {/* Forecast Cards Skeleton */}
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-20rem)]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            {/* Time Badge */}
            <div className="flex justify-between items-center mb-4">
              <div className="skeleton h-8 w-24 bg-white/50"></div>
              <div className="skeleton h-6 w-20 bg-white/50 rounded-full"></div>
            </div>

            {/* Weather Icon Area */}
            <div className="flex items-center gap-4 mb-4 bg-white/30 rounded-xl p-4">
              <div className="skeleton w-20 h-20 rounded-xl bg-white/50"></div>
              <div className="flex flex-col gap-2">
                <div className="skeleton h-6 w-28 bg-white/50"></div>
                <div className="skeleton h-4 w-36 bg-white/50"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="text-center">
                  <div className="skeleton h-8 w-16 bg-white/50 mx-auto mb-1"></div>
                  <div className="skeleton h-4 w-12 bg-white/50 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="divider my-2"></div>

      {/* Footer Skeleton */}
      <div className="flex justify-center">
        <div className="skeleton h-5 w-48 bg-white/40"></div>
      </div>
    </div>
  </div>
);
