import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, Loader2 } from 'lucide-react'; // Icons for steps

type StepStatus = 'completed' | 'current' | 'pending';

interface Step {
  name: string;
  status: StepStatus;
}

interface OrderProgressStepperProps {
  steps: Step[];
  className?: string;
}

const OrderProgressStepper: React.FC<OrderProgressStepperProps> = ({ steps, className }) => {
  console.log("Rendering OrderProgressStepper with steps:", steps.length);

  if (!steps || steps.length === 0) {
    return null;
  }

  const getStepIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className={cn("flex items-start w-full", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2",
                step.status === 'completed' && "border-green-500 bg-green-50",
                step.status === 'current' && "border-blue-500 bg-blue-50",
                step.status === 'pending' && "border-gray-300 bg-gray-50"
              )}
            >
              {getStepIcon(step.status)}
            </div>
            <p
              className={cn(
                "mt-1 text-xs text-center w-20 truncate",
                step.status === 'completed' && "font-semibold text-green-600",
                step.status === 'current' && "font-semibold text-blue-600",
                step.status === 'pending' && "text-gray-500"
              )}
            >
              {step.name}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-1 mt-5 rounded", // Line connector
                step.status === 'completed' ? "bg-green-500" : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderProgressStepper;