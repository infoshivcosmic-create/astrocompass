'use client';

import { RotateCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CalibrationToolProps {
  isCalibrated: boolean;
}

export function CalibrationTool({ isCalibrated }: CalibrationToolProps) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      {!isCalibrated && (
        <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Calibration Recommended</AlertTitle>
            <AlertDescription>
            Compass accuracy is low. Please move your device in a figure-eight motion.
            </AlertDescription>
        </Alert>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <RotateCw /> Recalibrate Instructions
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Compass Calibration</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4 pt-4">
              <p>
                To improve compass accuracy, please move your phone in a figure-eight pattern a few times.
              </p>
              <div className="flex justify-center">
                <svg width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className="stroke-primary">
                    <path
                        d="M 30 40 A 20 20, 0, 1, 0, 70 40 A 20 20, 0, 1, 0, 30 40"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="188.5"
                        strokeDashoffset="188.5"
                    >
                        <animate attributeName="stroke-dashoffset" from="377" to="0" dur="4s" repeatCount="indefinite" />
                    </path>
                </svg>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full">Got It</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
