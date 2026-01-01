export const WeatherSkeleton = () => (
  <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl text-base-content h-dvh rounded-none" id="Weather">
    <div className="card-body">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
          <div>
            <div className="skeleton h-8 w-32 mb-2"></div>
            <div className="skeleton h-4 w-16"></div>
          </div>
        </div>
        <div className="skeleton h-5 w-40"></div>
      </div>

      <div className="divider my-2"></div>

      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3 bg-accent rounded-2xl p-4 shadow-md">
          <div className="skeleton w-20 h-20 rounded-xl"></div>
          <div>
            <div className="skeleton h-6 w-24 mb-2"></div>
            <div className="skeleton h-4 w-32"></div>
          </div>
        </div>
      </div>

      <div className="divider my-2"></div>

      <div className="stats stats-vertical md:stats-horizontal shadow-lg bg-base-100 w-full mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat place-items-center">
            <div className="skeleton h-8 w-8 rounded-full mb-2"></div>
            <div className="skeleton h-5 w-16 mb-2"></div>
            <div className="skeleton h-10 w-16 mb-1"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-accent rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2">
              <div className="skeleton w-8 h-8 rounded-full"></div>
            </div>
            <div className="skeleton h-4 w-16 mx-auto mb-1"></div>
            <div className="skeleton h-6 w-20 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ForecastSkeleton.tsx
export const ForecastSkeleton = () => (
  <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl text-base-content h-dvh rounded-none overflow-y-auto" id="Forecast">
    <div className="card-body">
      <div className="flex justify-between items-center mb-4">
        <div className="skeleton h-9 w-64"></div>
      </div>

      <div className="divider my-2"></div>

      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-100 shadow-lg">
            <input type="checkbox" defaultChecked={index === 0} />
            <div className="collapse-title">
              <div className="flex items-center gap-3">
                <div className="skeleton h-6 w-48"></div>
                <div className="skeleton h-6 w-24 rounded-full"></div>
              </div>
            </div>
            <div className="collapse-content">
              <div className="mt-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="card bg-accent shadow-lg">
                    <div className="card-body">
                      <div className="skeleton h-7 w-20 mb-4"></div>

                      <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-3 bg-base-100 rounded-xl p-3 shadow-md">
                          <div className="skeleton w-16 h-16 rounded-lg"></div>
                          <div>
                            <div className="skeleton h-5 w-20 mb-2"></div>
                            <div className="skeleton h-4 w-24"></div>
                          </div>
                        </div>
                      </div>

                      <div className="stats stats-vertical xl:stats-horizontal shadow-lg bg-base-100 w-full mb-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="stat place-items-center">
                            <div className="skeleton h-6 w-6 rounded-full mb-1"></div>
                            <div className="skeleton h-4 w-12 mb-1"></div>
                            <div className="skeleton h-8 w-12"></div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="bg-base-100 rounded-xl p-3 shadow-md text-center">
                            <div className="flex justify-center mb-2">
                              <div className="skeleton w-7 h-7 rounded-full"></div>
                            </div>
                            <div className="skeleton h-3 w-16 mx-auto mb-1"></div>
                            <div className="skeleton h-5 w-12 mx-auto"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);