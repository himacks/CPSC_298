"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    {
      title: "Concept",
      content: (
        <div>
          <p className="mb-4">
            {`We've discovered that forcing heavyweight models to output in
            specific formats can reduce the quality and intelligence of their
            responses. Instead, a two-step approach yields better results:`}
          </p>
          <ol className="list-decimal list-inside mb-4">
            <li>
              Use a heavyweight model for inference and unstructured response
            </li>
            <li>
              Pass the response through a lightweight model for formatting
            </li>
          </ol>
          <p>
            This approach preserves tokens for thinking rather than formatting,
            resulting in higher quality outputs.
          </p>
        </div>
      ),
    },
    {
      title: "Traditional Approach",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Traditional Approach: Direct Structured Output
          </h3>
          <SyntaxHighlighter language="python" style={dracula}>
            {`response = heavyweightModel.generate(
  "Summarize the benefits of exercise in a JSON format with keys: 
  cardiovascular, mental_health, and weight_management"
)`}
          </SyntaxHighlighter>
          <ul className="list-disc list-inside mt-4">
            <li>Forces model to focus on formatting</li>
            <li>May reduce content quality</li>
            <li>Consumes tokens for structure rather than thinking</li>
            <li>One-step process, but potentially less effective</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Improved Approach",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Improved Approach: Two-Step Process
          </h3>
          <SyntaxHighlighter language="python" style={dracula}>
            {`# Step 1: Generate unstructured content
unstructured_response = heavyweightModel.generate(
  "Summarize the benefits of exercise"
)

# Step 2: Format the response
structured_response = lightweightModel.generate(
  f"Convert this text to JSON with keys cardiovascular, mental_health, and weight_management: {unstructured_response}"
)`}
          </SyntaxHighlighter>
          <ul className="list-disc list-inside mt-4">
            <li>Allows heavyweight model to focus on content</li>
            <li>Preserves tokens for thinking and inference</li>
            <li>Uses lightweight model for formatting</li>
            <li>Two-step process, but yields higher quality results</li>
          </ul>
        </div>
      ),
    },
  ];

  const quizQuestion = {
    question: "Which approach is more effective for complex LLM tasks?",
    options: [
      { value: "traditional", label: "Traditional single-step approach" },
      {
        value: "two-step",
        label: "Two-step approach with separate inference and formatting",
      },
      { value: "random", label: "Randomly alternating between approaches" },
    ],
    correctAnswer: "two-step",
  };

  const handleQuizSubmit = () => {
    setShowResult(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">LLM Techniques Cookbook</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Optimizing LLM Output: A Two-Step Approach</CardTitle>
          <CardDescription>
            Learn how to improve LLM responses by separating inference and
            formatting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeStep.toString()}
            onValueChange={(value) => setActiveStep(parseInt(value))}
          >
            <TabsList className="grid w-full grid-cols-3">
              {steps.map((step, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step, index) => (
              <TabsContent key={index} value={index.toString()}>
                {step.content}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <div className="flex justify-between p-6">
          <Button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setActiveStep(Math.min(steps.length - 1, activeStep + 1))
            }
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quiz: Test Your Knowledge</CardTitle>
          <CardDescription>
            {`Apply what you've learned about optimizing LLM output`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {quizQuestion.question}
              </h3>
              <RadioGroup
                onValueChange={setQuizAnswer}
                value={quizAnswer || undefined}
              >
                {quizQuestion.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button onClick={handleQuizSubmit} disabled={!quizAnswer}>
              Submit Answer
            </Button>
          </form>
          {showResult && (
            <Alert
              className="mt-4"
              variant={
                quizAnswer === quizQuestion.correctAnswer
                  ? "default"
                  : "destructive"
              }
            >
              <AlertTitle>
                {quizAnswer === quizQuestion.correctAnswer
                  ? "Correct!"
                  : "Incorrect"}
              </AlertTitle>
              <AlertDescription>
                {quizAnswer === quizQuestion.correctAnswer
                  ? "The two-step approach is indeed more effective for complex LLM tasks."
                  : "The two-step approach is more effective as it allows for better quality outputs by separating inference and formatting."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
