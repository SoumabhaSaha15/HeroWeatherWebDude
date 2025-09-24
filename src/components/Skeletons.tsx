import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";

export const WeatherDetailsSkeleton = () => (
  <Card className="w-full shadow-lg rounded-3xl bg-gray-600/30 backdrop-blur-md animate-pulse">
    <CardHeader className="flex justify-between items-center">
      <div className="h-6 w-48 bg-gray-400/50 rounded-lg"></div>
    </CardHeader>
    <Divider />
    <CardBody>
      <div className="grid grid-cols-1 gap-4 text-2xl">
        {[...Array(8)].map((_, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-400/50"></div>
              <div className="h-6 w-32 bg-gray-400/50 rounded-lg"></div>
              <Divider orientation="vertical" className="mx-2 h-8" />
              <div className="h-6 w-32 bg-gray-400/50 rounded-lg"></div>
            </div>
            <Divider />
          </React.Fragment>
        ))}
      </div>
    </CardBody>
  </Card>
);

export const WeatherSkeleton = () => (
  <Card className="w-full max-w-full shadow-lg rounded-3xl bg-gray-600/30 backdrop-blur-md animate-pulse">
    <CardHeader className="flex justify-between items-center">
      <div className="h-8 w-48 bg-gray-400/50 rounded-lg"></div>
      <Divider orientation="vertical" className="h-12" />
      <div className="h-4 w-36 bg-gray-400/50 rounded-lg"></div>
    </CardHeader>
    <Divider />
    <CardBody>
      <div className="flex justify-center items-center mb-4">
        <div className="w-20 h-20 bg-gray-400/50 rounded-lg"></div>
        <div className="ml-4">
          <div className="h-6 w-24 bg-gray-400/50 rounded-lg mb-2"></div>
          <div className="h-4 w-32 bg-gray-400/50 rounded-lg"></div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-8 w-16 bg-gray-400/50 rounded-lg mb-2"></div>
            <div className="h-4 w-12 bg-gray-400/50 rounded-lg"></div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

export const ForecastSkeleton = () => (
  <Card className="bg-white/30 backdrop-blur-md rounded-3xl h-full min-h-full animate-pulse">
    <CardHeader>
      <div className="h-8 w-64 bg-gray-400 rounded-lg"></div>
    </CardHeader>
    <Divider />
    <CardBody className="max-h-[calc(100vh-8rem)] h-[calc(100vh-8rem)] overflow-hidden">
      <div className="w-full bg-gray-600 backdrop-blur-md rounded-3xl my-1 p-4">
        <div className="flex justify-around mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-16 bg-gray-400/50 rounded-lg"></div>
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 w-full bg-gray-400/50 rounded-3xl"></div>
          ))}
        </div>
      </div>
    </CardBody>
    <Divider />
    <CardFooter className="items-center justify-center">
      <div className="h-4 w-32 bg-gray-400/50 rounded-lg"></div>
    </CardFooter>
  </Card>
);
