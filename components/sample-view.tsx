"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sample } from "@/lib/generated/prisma";
import { addSample, deleteSample } from "@/server/actions/sample";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

export default function SampleView({
  initialSamples,
}: {
  initialSamples: Sample[];
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleAddSample = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await addSample(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setShowAddForm(false);
      }
    });
  };

  const handleDeleteSample = (id: string) => {
    startTransition(async () => {
      const result = await deleteSample(id);
      if (result.error) {
        setError(result.error);
      }
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              EduVibe
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your educational samples with ease
          </p>
        </div>

        {/* Add Sample Section */}
        <div className="mb-8">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Sample
              </CardTitle>
              <CardDescription>
                Create a new sample entry in your database
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showAddForm ? (
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Sample
                </Button>
              ) : (
                <form action={handleAddSample} className="space-y-4">
                  <div>
                    <Label htmlFor="sample-id">Sample ID</Label>
                    <Input
                      id="sample-id"
                      name="id"
                      placeholder="Enter sample ID"
                      className="mt-1"
                      required
                    />
                  </div>
                  {error && (
                    <div className="rounded bg-red-50 p-2 text-sm text-red-600">
                      {error}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isPending}
                    >
                      {isPending ? "Creating..." : "Create"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setError(null);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Samples Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialSamples.map((sample) => (
            <Card key={sample.id} className="transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Sample {sample.id}
                    </CardTitle>
                    <CardDescription>ID: {sample.id}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSample(sample.id)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {formatDate(sample.createdAt)}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {formatDate(sample.updatedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 rounded-lg bg-white px-6 py-3 shadow-sm dark:bg-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                {initialSamples.length}
              </span>{" "}
              {initialSamples.length === 1 ? "sample" : "samples"} in database
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
